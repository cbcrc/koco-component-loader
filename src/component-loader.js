define(['knockout', 'lodash'],
    function(ko, _) {
        'use strict';
        return {

            loadViewModel: function(name, componentConfig, callback) {
                //pour bypass
                //callback(null);

                if (componentConfig.htmlOnly === true) {
                    callback(null);
                }

                if (componentConfig.type === 'page') {
                    ko.components.defaultLoader.loadViewModel(name, { createViewModel: function(viewModel, componentInfo) {
                        if (viewModel && viewModel.init) {
                            viewModel.init(componentInfo);
                        }

                        return viewModel;
                    } } , callback);
                } else {


                    ko.components.defaultLoader.loadViewModel(name, {createViewModel: function(params, componentInfo) {
                        if (_.isFunction(componentConfig)) {
                            return new componentConfig(params, componentInfo);
                        }

                        return componentConfig;
                    }}, callback);
                }
            },
            loadComponent: function(name, componentConfig, callback) {
                //pour bypass
                //callback(null);

                var kocoComponentConfig = createComponentConfigWithKocoConventions(name, componentConfig);
                ko.components.defaultLoader.loadComponent(name, kocoComponentConfig, callback);
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
    });
