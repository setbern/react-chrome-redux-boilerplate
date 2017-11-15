#!/usr/bin/env node

'use strict';

process.bin = process.title = 'setlife';

var program = require('commander');
var pkg = require('./package.json');
var fs = require('fs-extra');
var path = require('path');
var ejs = require('ejs');
var _ = require('lodash');
var pluralize = require('pluralize');

var generateComponent = function(name, options) {
    console.log('Creating ' + name + ' component...');

    var templatePath = path.join(process.cwd(), 'popup/templates', 'component.ejs');
    var destinationPath = path.join(process.cwd(), 'popup/components', name + '.jsx');
    var redux = options.redux;

    fs.readFile(templatePath, 'utf8', function(err, data) {
        var component = ejs.render(data, {
            name: name,
            redux: options.redux || false
        });

        fs.writeFile(destinationPath, component);
        console.log('Created component:  ' + name + '...');
    });
};

var generateStylesheet = function(name) {
    console.log('Creating ' + name + ' stylesheet...');

    var styleTemplate = path.join(process.cwd(), 'popup/templates', 'stylesheet.ejs');
    var styleDestination = path.join(process.cwd(), 'popup/styles', name + '.less');

    fs.readFile(styleTemplate, 'utf8', function(err, data) {
        var stylesheet = ejs.render(data, { name: name });

        fs.writeFile(styleDestination, stylesheet);
        console.log('Created stylesheet:  ' + name + '...');
    });
};

var generateModel = function(name, options) {
    console.log('Creating ' + name + ' model...');

    var templatePath = path.join(process.cwd(), 'api/templates', 'model.ejs');
    var destinationPath = path.join(process.cwd(), 'api/models', name + '.js');

    fs.readFile(templatePath, 'utf8', function(err, data) {
        var databaseTableName = pluralize(name.replace(/([A-Z])/g, '_$1').toLowerCase()).substring(1);

        var model = ejs.render(data, {
            name: name,
            databaseTableName: databaseTableName
        });

        fs.writeFile(destinationPath, model);
        console.log('Created model:  ' + name + '...');
    });
};

var generateType = function(name) {
    console.log('Creating ' + name + ' stylesheet...');

    var templatePath = path.join(process.cwd(), 'api/templates', 'type.ejs');
    var destinationPath = path.join(process.cwd(), 'api/types', name + 'Type.js');

    fs.readFile(templatePath, 'utf8', function(err, data) {
        var type = ejs.render(data, { name: name });

        fs.writeFile(destinationPath, type);
        console.log('Created type:  ' + name + '...');
    });
};

var addModelToIndex = function(name) {
    console.log('Adding ' + name + ' model to index...');

    var modelsIndexPath = path.join(process.cwd(), 'api/models', 'index.js');

    fs.readFile(modelsIndexPath, 'utf8', function(err, indexedModels) {
        var newModelIndex = indexedModels.split('return {')[0] + 'return {';
        var afterReturn = indexedModels.split('return {')[1];

        // Matches all strings inside require('') statements
        var rx = /require\(\'.\/\s*(.*?)\s*\'\)/g;
        var models = [];
        var match;

        while ((match = rx.exec(afterReturn)) !== null) {
            models.push(match[1]);
        }

        models.push(name);
        models.sort();

        models.forEach(function(m, i) {
            newModelIndex += '\n        ' + m + ': require(\'./' + m + '\'),';
        });
        newModelIndex = newModelIndex.substring(0, newModelIndex.length - 1);
        newModelIndex += '\n    };\n})();';

        fs.writeFile(modelsIndexPath, newModelIndex);
        console.log('Added model:  ' + name + ' to index...');
    });
};

var addTypeToIndex = function(name) {
    console.log('Adding ' + name + 'Type to index...');

    var typesIndexPath = path.join(process.cwd(), 'api/types', 'index.js');

    fs.readFile(typesIndexPath, 'utf8', function(err, indexedTypes) {
        var newTypeIndex = indexedTypes.split('return {')[0] + 'return {';
        var afterReturn = indexedTypes.split('return {')[1];

        // Matches all strings inside require('') statements
        var rx = /require\(\'.\/\s*(.*?)\s*\'\)/g;
        var types = [];
        var match;

        while ((match = rx.exec(afterReturn)) !== null) {
            types.push(match[1]);
        }

        types.push(name + 'Type');
        types.sort();

        types.forEach(function(t, i) {
            newTypeIndex += '\n        ' + t + ': require(\'./' + t + '\'),';
        });
        newTypeIndex = newTypeIndex.substring(0, newTypeIndex.length - 1);
        newTypeIndex += '\n    };\n})();';

        fs.writeFile(typesIndexPath, newTypeIndex);
        console.log('Added type:  ' + name + 'Type to index...');
    });
};

var addStyleToIndex = function(name) {
    console.log('Adding ' + name + ' stylesheet to index...');

    var stylesIndexPath = path.join(process.cwd(), 'popup/styles', 'index.less');

    fs.readFile(stylesIndexPath, 'utf8', function(err, indexedStyles) {
        var mainStyles = indexedStyles.substring(0, indexedStyles.indexOf('// Component styles'));
        var newStyleIndex = mainStyles + '// Component styles';

        var importLines = indexedStyles.split('@import ');
        var componentStyles = _.reduce(importLines, function(e, k, i) {
            if (k.toLowerCase() != k) {
                e.push(k.replace(/(\n)|(\')|(;)/g, ''));
            }
            return e;
        }, []);
        componentStyles.shift();
        componentStyles.push(name);
        componentStyles.sort();
        componentStyles.forEach(function(e, i) {
            newStyleIndex += '\n@import \'' + e + '\';';
        });

        fs.writeFile(stylesIndexPath, newStyleIndex);
        console.log('Added stylesheet:  ' + name + ' to index...');
    });
};

// Parse command line options

program
    .version(pkg.version)
    .usage('<command> [options]');

program
    .command('create-component <name>')
    .option('-s, --style', 'Create dedicated stylesheet')
    .option('-r, --redux', 'Connect Redux state mappings')
    .description('Generate a new React component.')
    .action(function(name, options) {
        generateComponent(name, options);
        
        var style = options.style;

        if (style) {
            generateStylesheet(name);
            addStyleToIndex(name);
        }
    });

program
    .command('create-model <name>')
    .option('-t, --type', 'Create associated Bookshelf-GraphQL Type file in /api/types/')
    .description('Generate a new Bookshelf Model and associated GraphQL Type (optional). Use Pascal Case (ie: NewUser) and do not write the \'-Type\' suffix, it will be appended automagically.')
    .action(function(name, options) {
        generateModel(name);
        addModelToIndex(name);
        
        var type = options.type;

        if (type) {
            generateType(name);
            addTypeToIndex(name);
        }
    });


// Failsafe that shows the help dialogue if the command is not recognized (`$ react xyz`)
program.on('*', function(opt) {
    program.help();
});

program.parse(process.argv);

// Handle case where no command is passed (`$ react`)
if (!process.argv.slice(2).length) {
    program.help();
}
