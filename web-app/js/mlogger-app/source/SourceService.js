'use strict';

angular.module('sourceService', [])

    .factory('SourceFactory', function ($q, $http) {
        return {
            source: {},
            setSource:function (source) {
                this.source = source;
            },
            getSource:function () {
                return this.source;
            },
            save:function (project) {
                var deferred = $q.defer();
                $http.post("/mlogger/source/save", project)
                    .success(function (data) {
                                 deferred.resolve(data);
                             })
                    .error(function (data, status) {
                               deferred.reject(new Error('Error saving source data: ' + status));
                           });
                return deferred.promise;
            }
        }
    })

    .value('ProjectDataUtil', {
        findSources:function (treeData) {
            var relationshipsInvolvedInMap = {};
            _.each(treeData.rootProducts, function (rootProduct) {

                if (rootProduct.relationshipsInvolvedIn) {
                    relationshipsInvolvedInMap[rootProduct.id] = rootProduct.relationshipsInvolvedIn.relationships;
                }

                function addChildren(children, relationshipsInvolvedInMap) {
                    _.each(children, function (child) {
                        if (child.relationshipsInvolvedIn) {
                            relationshipsInvolvedInMap[child.id] = child.relationshipsInvolvedIn.relationships;
                        }

                        addChildren(child.children, relationshipsInvolvedInMap);
                    });
                }

                addChildren(rootProduct.children, relationshipsInvolvedInMap);
            });

            return relationshipsInvolvedInMap;
        }
    });