'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    loadViewModel: function loadViewModel(name, componentConfig, callback) {
        //pour bypass
        //callback(null);

        if (componentConfig.htmlOnly === true) {
            callback(null);
        }

        if (componentConfig.type === 'page') {
            _knockout2.default.components.defaultLoader.loadViewModel(name, {
                createViewModel: function createViewModel(viewModel, componentInfo) {
                    if (viewModel && viewModel.init) {
                        viewModel.init(componentInfo);
                    }

                    return viewModel;
                }
            }, callback);
        } else {

            _knockout2.default.components.defaultLoader.loadViewModel(name, {
                createViewModel: function createViewModel(params, componentInfo) {
                    if (_lodash2.default.isFunction(componentConfig)) {
                        return new componentConfig(params, componentInfo);
                    }

                    return componentConfig;
                }
            }, callback);
        }
    },
    loadComponent: function loadComponent(name, componentConfig, callback) {
        //pour bypass
        //callback(null);

        var kocoComponentConfig = createComponentConfigWithKocoConventions(name, componentConfig);
        _knockout2.default.components.defaultLoader.loadComponent(name, kocoComponentConfig, callback);
    }
};


function createComponentConfigWithKocoConventions(name, componentConfig) {
    var basePath = componentConfig.basePath || 'components/' + name;

    if (!componentConfig.type) {
        componentConfig.type = 'component';
    }

    if (componentConfig.isBower) {
        basePath = 'bower_components/koco-' + name + '/src';
    }

    var requirePath = basePath + '/' + name;

    var templateRequirePath;

    if (componentConfig.template) {
        templateRequirePath = 'text!' + componentConfig.template;
    } else {
        templateRequirePath = 'text!' + requirePath + '.html';
    }

    componentConfig.template = {
        require: templateRequirePath
    };

    if (componentConfig.htmlOnly !== true) {
        if (componentConfig.type === 'page') {
            componentConfig.viewModel = componentConfig;
        } else {
            componentConfig.viewModel = {
                require: requirePath + '-ui'
            };
        }
    }

    return componentConfig;
}