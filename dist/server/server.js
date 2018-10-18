/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "fce24519ebe403284b21";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".server.js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:4001/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/index.js":
/*!*************************!*\
  !*** ./config/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 生产环境配置\nvar config = {\n  // 正式环境\n  debug: false,\n  // 域名\n  host: 'localhost',\n  // 服务端口\n  port: 4000,\n  // 登录token，cookie 的名称\n  auth_cookie_name: 'signin-cookie',\n  // https://github.com/css-modules/css-modules\n  class_scoped_name: '[hash:base64:8]',\n  // 前端打包后，静态资源路径前缀\n  // 生成效果如：//localhost:4000/app.bundle.js\n  public_path: '//localhost:4000' // 开发环境配置\n\n};\n\nif (true) {\n  config.debug = true;\n  config.class_scoped_name = '[name]_[local]__[hash:base64:5]';\n}\n\nmodule.exports = config;\n\n//# sourceURL=webpack:///./config/index.js?");

/***/ }),

/***/ "./src/actions/detail.js":
/*!*******************************!*\
  !*** ./src/actions/detail.js ***!
  \*******************************/
/*! exports provided: detail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"detail\", function() { return detail; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _reducers_detail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/detail */ \"./src/reducers/detail.js\");\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ \"./src/utils/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\nfunction detail(_ref) {\n  var id = _ref.id;\n  return function (dispatch, getState) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var info, _ref3, _ref4, err, data;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                info = Object(_reducers_detail__WEBPACK_IMPORTED_MODULE_1__[\"getDetail\"])(getState(), id);\n                info.loading = true;\n                if (!info.data) info.data = [];\n                dispatch({\n                  type: 'GET_DETAIL',\n                  id: id,\n                  data: info\n                });\n                _context.next = 6;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: _utils_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].api.detail({\n                    id: id\n                  }),\n                  method: 'get'\n                });\n\n              case 6:\n                _ref3 = _context.sent;\n                _ref4 = _slicedToArray(_ref3, 2);\n                err = _ref4[0];\n                data = _ref4[1];\n\n                if (data && data.status) {\n                  info.loading = false;\n                  info.data = data.data;\n                  dispatch({\n                    type: 'GET_DETAIL',\n                    id: id,\n                    data: info\n                  });\n                  resolve([null, info.data]);\n                } else {\n                  resolve(['detail failed']);\n                }\n\n              case 11:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }());\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/detail.js?");

/***/ }),

/***/ "./src/actions/list.js":
/*!*****************************!*\
  !*** ./src/actions/list.js ***!
  \*****************************/
/*! exports provided: listLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"listLoad\", function() { return listLoad; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _reducers_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/list */ \"./src/reducers/list.js\");\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ \"./src/utils/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\nfunction listLoad(_ref) {\n  var id = _ref.id,\n      limit = _ref.limit,\n      order = _ref.order,\n      day = _ref.day;\n  return function (dispatch, getState) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var list, _ref3, _ref4, err, data;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                list = Object(_reducers_list__WEBPACK_IMPORTED_MODULE_1__[\"getList\"])(getState(), id);\n                list.loading = true;\n                !list.page ? list.page = 1 : list.page += 1;\n\n                if (!list.more) {\n                  _context.next = 5;\n                  break;\n                }\n\n                return _context.abrupt(\"return\");\n\n              case 5:\n                if (!list.data) list.data = [];\n                dispatch({\n                  type: 'GET_LIST',\n                  id: id,\n                  data: list\n                });\n                _context.next = 9;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: _utils_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].api.typelist({\n                    page: list.page,\n                    limit: limit,\n                    order: order,\n                    day: day\n                  }),\n                  method: 'get'\n                });\n\n              case 9:\n                _ref3 = _context.sent;\n                _ref4 = _slicedToArray(_ref3, 2);\n                err = _ref4[0];\n                data = _ref4[1];\n\n                if (data && data.status === 0) {\n                  list.loading = false;\n                  list.data = list.data.concat(data.data);\n                  list.more = data.total === list.data.length;\n                  dispatch({\n                    type: 'GET_LIST',\n                    id: id,\n                    data: list\n                  });\n                  resolve([null, list.data]);\n                } else {\n                  resolve(['detail failed']);\n                }\n\n              case 14:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }());\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/list.js?");

/***/ }),

/***/ "./src/actions/player.js":
/*!*******************************!*\
  !*** ./src/actions/player.js ***!
  \*******************************/
/*! exports provided: playerLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playerLoad\", function() { return playerLoad; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _reducers_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/player */ \"./src/reducers/player.js\");\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ \"./src/utils/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\nfunction playerLoad(_ref) {\n  var id = _ref.id,\n      pid = _ref.pid;\n  return function (dispatch, getState) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var player, _ref3, _ref4, err, data;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                player = Object(_reducers_player__WEBPACK_IMPORTED_MODULE_1__[\"getPlayerList\"])(getState(), id, pid);\n                player.loading = true;\n                if (!player.data) player.data = [];\n                dispatch({\n                  type: 'GET_PLAYER',\n                  id: id,\n                  data: player,\n                  pid: pid\n                });\n                _context.next = 6;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: _utils_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].api.player({\n                    id: id,\n                    pid: pid\n                  }),\n                  method: 'get'\n                });\n\n              case 6:\n                _ref3 = _context.sent;\n                _ref4 = _slicedToArray(_ref3, 2);\n                err = _ref4[0];\n                data = _ref4[1];\n\n                if (data && data.status) {\n                  player.loading = false;\n                  player.data = data.data;\n                  dispatch({\n                    type: 'GET_PLAYER',\n                    id: id,\n                    data: player,\n                    pid: pid\n                  });\n                  resolve([null, player.data]);\n                } else {\n                  resolve(['detail failed']);\n                }\n\n              case 11:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }());\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/player.js?");

/***/ }),

/***/ "./src/actions/playlist.js":
/*!*********************************!*\
  !*** ./src/actions/playlist.js ***!
  \*********************************/
/*! exports provided: playlist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playlist\", function() { return playlist; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _reducers_playlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/playlist */ \"./src/reducers/playlist.js\");\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ \"./src/utils/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\nfunction playlist(_ref) {\n  var id = _ref.id;\n  return function (dispatch, getState) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var play, _ref3, _ref4, err, data;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                play = Object(_reducers_playlist__WEBPACK_IMPORTED_MODULE_1__[\"getPlayList\"])(getState(), id);\n                play.loading = true;\n                if (!play.data) play.data = [];\n                dispatch({\n                  type: 'GET_PLAY_LIST',\n                  id: id,\n                  data: play\n                });\n                _context.next = 6;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: _utils_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].api.playlist({\n                    id: id\n                  }),\n                  method: 'get'\n                });\n\n              case 6:\n                _ref3 = _context.sent;\n                _ref4 = _slicedToArray(_ref3, 2);\n                err = _ref4[0];\n                data = _ref4[1];\n\n                if (data && data.status) {\n                  play.loading = false;\n                  play.data = data.data;\n                  dispatch({\n                    type: 'GET_PLAY_LIST',\n                    id: id,\n                    data: play\n                  });\n                  resolve([null, play.data]);\n                } else {\n                  resolve(['detail failed']);\n                }\n\n              case 11:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }());\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/playlist.js?");

/***/ }),

/***/ "./src/actions/posts.js":
/*!******************************!*\
  !*** ./src/actions/posts.js ***!
  \******************************/
/*! exports provided: loadPostsList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadPostsList\", function() { return loadPostsList; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _reducers_posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/posts */ \"./src/reducers/posts.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\nfunction loadPostsList(_ref) {\n  var id = _ref.id,\n      _ref$filter = _ref.filter,\n      filter = _ref$filter === void 0 ? {} : _ref$filter;\n  return function (dispatch, getState) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var list, variables, _ref3, _ref4, err, data, postsData;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                list = Object(_reducers_posts__WEBPACK_IMPORTED_MODULE_1__[\"getPostsListByListId\"])(getState(), id);\n                list.loading = true;\n                list.filter = filter;\n                if (!list.data) list.data = [];\n                dispatch({\n                  type: 'SET_POSTS_LIST_BY_NAME',\n                  id: id,\n                  data: list\n                });\n                variables = convertFilrerFormat(filter);\n\n                if (!variables) {\n                  variables = '';\n                } else {\n                  variables = \"(\".concat(variables, \")\");\n                } // 储存 cookie\n\n\n                _context.next = 9;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: 'https://admin.xiaoduyu.com/graphql',\n                  method: 'post',\n                  data: {\n                    operationName: null,\n                    variables: {},\n                    query: \"{\\n          posts\".concat(variables, \"{\\n            _id\\n            comment_count\\n            content_html\\n            title\\n            topic_id{\\n              _id\\n              name\\n            }\\n            type\\n            user_id{\\n              _id\\n              nickname\\n              brief\\n              avatar_url\\n            }\\n          }\\n        }\")\n                  }\n                });\n\n              case 9:\n                _ref3 = _context.sent;\n                _ref4 = _slicedToArray(_ref3, 2);\n                err = _ref4[0];\n                data = _ref4[1];\n\n                if (data && data.data) {\n                  list.loading = false;\n                  postsData = data.data[Reflect.ownKeys(data.data)[0]];\n\n                  if (postsData && postsData.length > 0) {\n                    list.data = list.data.concat(modifyList(postsData));\n                  }\n\n                  dispatch({\n                    type: 'SET_POSTS_LIST_BY_NAME',\n                    id: id,\n                    data: list\n                  });\n                  resolve([null, list.data]);\n                } else {\n                  resolve(['loadPostList load failed']);\n                }\n\n              case 14:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }());\n  };\n}\n\nvar modifyList = function modifyList(data) {\n  var arr = [];\n  data.map(function (item) {\n    var text = item.content_html.replace(/<[^>]+>/g, \"\");\n    if (text.length > 140) text = text.slice(0, 140) + '...';\n    item.content_summary = text;\n    arr.push(item);\n  });\n  return arr;\n}; // 将参数对象转换成，GraphQL提交参数的格式\n\n\nvar convertFilrerFormat = function convertFilrerFormat(params) {\n  var arr = [];\n\n  for (var i in params) {\n    var v = '';\n\n    switch (_typeof(params[i])) {\n      case 'string':\n        v = '\"' + params[i] + '\"';\n        break;\n\n      case 'number':\n        v = params[i];\n        break;\n\n      default:\n        v = params[i];\n    }\n\n    arr.push(i + ':' + v);\n  }\n\n  return arr.join(',');\n};\n\n//# sourceURL=webpack:///./src/actions/posts.js?");

/***/ }),

/***/ "./src/actions/top.js":
/*!****************************!*\
  !*** ./src/actions/top.js ***!
  \****************************/
/*! exports provided: topLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"topLoad\", function() { return topLoad; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _reducers_top__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/top */ \"./src/reducers/top.js\");\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ \"./src/utils/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\nfunction topLoad(_ref) {\n  var order = _ref.order,\n      area = _ref.area;\n  return function (dispatch, getState) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var top, _ref3, _ref4, err, data;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                top = Object(_reducers_top__WEBPACK_IMPORTED_MODULE_1__[\"getTopList\"])(getState(), order, area);\n                top.loading = true;\n                if (!top.data) top.data = [];\n                dispatch({\n                  type: 'GET_TOP',\n                  order: order,\n                  data: top,\n                  area: area\n                });\n                _context.next = 6;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: _utils_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].api.top({\n                    order: order,\n                    area: area\n                  }),\n                  method: 'get'\n                });\n\n              case 6:\n                _ref3 = _context.sent;\n                _ref4 = _slicedToArray(_ref3, 2);\n                err = _ref4[0];\n                data = _ref4[1];\n\n                if (data && data.status) {\n                  top.loading = false;\n                  top.data = data.data;\n                  dispatch({\n                    type: 'GET_TOP',\n                    order: order,\n                    data: top,\n                    area: area\n                  });\n                  resolve([null, top.data]);\n                } else {\n                  resolve(['detail failed']);\n                }\n\n              case 11:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }());\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/top.js?");

/***/ }),

/***/ "./src/actions/user.js":
/*!*****************************!*\
  !*** ./src/actions/user.js ***!
  \*****************************/
/*! exports provided: saveAccessToken, saveUserInfo, signIn, signOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveAccessToken\", function() { return saveAccessToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveUserInfo\", function() { return saveUserInfo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signIn\", function() { return signIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signOut\", function() { return signOut; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/config */ \"./src/utils/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n // 储存accessToken到redux\n\nfunction saveAccessToken(_ref) {\n  var accessToken = _ref.accessToken;\n  return function (dispatch) {\n    dispatch({\n      type: 'SAVE_ACCESS_TOKEN',\n      accessToken: accessToken\n    });\n  };\n}\nfunction saveUserInfo(_ref2) {\n  var userinfo = _ref2.userinfo;\n  return function (dispatch) {\n    dispatch({\n      type: 'SAVE_USERINFO',\n      userinfo: userinfo\n    });\n  };\n}\nfunction signIn(_ref3) {\n  var username = _ref3.username,\n      password = _ref3.password;\n  return function (dispatch) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref4 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var _ref5, _ref6, err, data, _ref7, _ref8;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: _utils_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].api.login,\n                  method: 'post',\n                  data: {\n                    username: username,\n                    password: password,\n                    isJson: true\n                  }\n                });\n\n              case 2:\n                _ref5 = _context.sent;\n                _ref6 = _slicedToArray(_ref5, 2);\n                err = _ref6[0];\n                data = _ref6[1];\n                console.log(data);\n\n                if (data.rcode === 1) {\n                  dispatch({\n                    type: 'SAVE_USERINFO',\n                    userinfo: data.data\n                  });\n                  resolve([null, data.data]);\n                } else {\n                  resolve([data.msg]);\n                } // 储存 cookie\n\n\n                _context.next = 10;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: window.location.origin + '/sign/in',\n                  method: 'post',\n                  data: {\n                    auth_sign: data.data.auth,\n                    userinfo: data.data\n                  }\n                });\n\n              case 10:\n                _ref7 = _context.sent;\n                _ref8 = _slicedToArray(_ref7, 2);\n                err = _ref8[0];\n                data = _ref8[1];\n\n                if (data && data.success) {\n                  resolve([null, true]);\n                } else {\n                  resolve(['sign error']);\n                }\n\n              case 15:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref4.apply(this, arguments);\n      };\n    }());\n  };\n}\nfunction signOut() {\n  return function (dispatch) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref9 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee2(resolve, reject) {\n        var _ref10, _ref11, err, data;\n\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _context2.next = 2;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: window.location.origin + '/sign/out',\n                  method: 'post'\n                });\n\n              case 2:\n                _ref10 = _context2.sent;\n                _ref11 = _slicedToArray(_ref10, 2);\n                err = _ref11[0];\n                data = _ref11[1];\n\n                if (data && data.success) {\n                  resolve([null, true]);\n                } else {\n                  resolve(['sign error']);\n                }\n\n              case 7:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      return function (_x3, _x4) {\n        return _ref9.apply(this, arguments);\n      };\n    }());\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/user.js?");

/***/ }),

/***/ "./src/actions/week.js":
/*!*****************************!*\
  !*** ./src/actions/week.js ***!
  \*****************************/
/*! exports provided: weekLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"weekLoad\", function() { return weekLoad; });\n/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ajax */ \"./src/common/ajax.js\");\n/* harmony import */ var _reducers_week__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/week */ \"./src/reducers/week.js\");\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ \"./src/utils/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\nfunction weekLoad(_ref) {\n  var id = _ref.id;\n  return function (dispatch, getState) {\n    return new Promise(\n    /*#__PURE__*/\n    function () {\n      var _ref2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(resolve, reject) {\n        var week, _ref3, _ref4, err, data;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                week = Object(_reducers_week__WEBPACK_IMPORTED_MODULE_1__[\"getWeekByListId\"])(getState(), id);\n                week.loading = true;\n                if (!week.data) week.data = [];\n                dispatch({\n                  type: 'GET_WEEK',\n                  id: id,\n                  data: week\n                });\n                _context.next = 6;\n                return Object(_common_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n                  url: _utils_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].api.week({\n                    limit: 1000\n                  }),\n                  method: 'get'\n                });\n\n              case 6:\n                _ref3 = _context.sent;\n                _ref4 = _slicedToArray(_ref3, 2);\n                err = _ref4[0];\n                data = _ref4[1];\n\n                if (data && data.status) {\n                  week.loading = false;\n                  week.data = data.data;\n                  dispatch({\n                    type: 'GET_WEEK',\n                    id: id,\n                    data: week\n                  });\n                  resolve([null, week.data]);\n                } else {\n                  resolve(['weekLoad failed']);\n                }\n\n              case 11:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function (_x, _x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }());\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/week.js?");

/***/ }),

/***/ "./src/common/ajax.js":
/*!****************************!*\
  !*** ./src/common/ajax.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar AJAX = function AJAX(_ref) {\n  var _ref$url = _ref.url,\n      url = _ref$url === void 0 ? '' : _ref$url,\n      _ref$method = _ref.method,\n      method = _ref$method === void 0 ? 'get' : _ref$method,\n      _ref$data = _ref.data,\n      data = _ref$data === void 0 ? {} : _ref$data,\n      _ref$headers = _ref.headers,\n      headers = _ref$headers === void 0 ? {} : _ref$headers;\n  var option = {\n    url: url,\n    method: method,\n    headers: headers\n  };\n\n  if (method == 'get') {\n    data._t = new Date().getTime();\n    option.params = data;\n  } else if (method == 'post') {\n    option.data = data;\n  }\n\n  return axios__WEBPACK_IMPORTED_MODULE_1___default()(option).then(function (resp) {\n    if (resp && resp.data) {\n      var res = resp.data;\n      return [null, res];\n    } else {\n      return ['return none'];\n    }\n  }).catch(function (error) {\n    if (error && error.response && error.response.data) {\n      return [error.response.data];\n    } else {\n      return ['return error'];\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AJAX);\n\n//# sourceURL=webpack:///./src/common/ajax.js?");

/***/ }),

/***/ "./src/components/head/index.js":
/*!**************************************!*\
  !*** ./src/components/head/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Head; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _actions_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/user */ \"./src/actions/user.js\");\n/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../reducers/user */ \"./src/reducers/user.js\");\n/* harmony import */ var react_css_modules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-css-modules */ \"react-css-modules\");\n/* harmony import */ var react_css_modules__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_css_modules__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style.scss */ \"./src/components/head/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_8__);\nvar _dec, _dec2, _class, _class2, _temp;\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\nvar Head = (_dec = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(function (state, props) {\n  return {\n    userinfo: Object(_reducers_user__WEBPACK_IMPORTED_MODULE_6__[\"getUserInfo\"])(state)\n  };\n}, function (dispatch) {\n  return {\n    signOut: Object(redux__WEBPACK_IMPORTED_MODULE_3__[\"bindActionCreators\"])(_actions_user__WEBPACK_IMPORTED_MODULE_5__[\"signOut\"], dispatch)\n  };\n}), _dec2 = react_css_modules__WEBPACK_IMPORTED_MODULE_7___default()(_style_scss__WEBPACK_IMPORTED_MODULE_8___default.a), _dec(_class = _dec2(_class = (_temp = _class2 =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Head, _React$Component);\n\n  function Head(props) {\n    var _this;\n\n    _classCallCheck(this, Head);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Head).call(this, props));\n    _this.signOut = _this.signOut.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  _createClass(Head, [{\n    key: \"signOut\",\n    value: function () {\n      var _signOut = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee() {\n        var _ref, _ref2, err, success;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return this.props.signOut();\n\n              case 2:\n                _ref = _context.sent;\n                _ref2 = _slicedToArray(_ref, 2);\n                err = _ref2[0];\n                success = _ref2[1];\n\n                if (success) {\n                  // 退出成功跳转到首页\n                  window.location.href = '/';\n                } else {\n                  alert('退出失败');\n                }\n\n              case 7:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function signOut() {\n        return _signOut.apply(this, arguments);\n      };\n    }()\n  }, {\n    key: \"render\",\n    value: function render() {\n      var userinfo = this.props.userinfo;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"header\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", {\n        className: \"navbar fixed-top navbar-expand-md navbar-expand-lg navbar-dark bg-dark bd-navbar\",\n        styleName: \"test\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n        className: \"navbar-brand\",\n        exact: true,\n        to: \"/\"\n      }, \"React\\u540C\\u6784\\u811A\\u624B\\u67B6\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"navbar-toggler\",\n        type: \"button\",\n        \"data-toggle\": \"collapse\",\n        \"data-target\": \"#navbarText\",\n        \"aria-controls\": \"navbarText\",\n        \"aria-expanded\": \"false\",\n        \"aria-label\": \"Toggle navigation\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"navbar-toggler-icon\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"collapse navbar-collapse\",\n        id: \"navbarText\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"navbar-nav mr-auto\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        className: \"nav-item\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n        className: \"nav-link\",\n        exact: true,\n        to: \"/\"\n      }, \"Home\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        className: \"nav-item\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n        className: \"nav-link\",\n        exact: true,\n        to: \"/topics\"\n      }, \"Topics\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        className: \"nav-item\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n        className: \"nav-link\",\n        exact: true,\n        to: \"/week\"\n      }, \"week\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"mt-2 mt-md-0\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"navbar-nav mr-auto\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        className: \"nav-item\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"nav-link\"\n      }, userinfo.nickname)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        className: \"nav-item\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n        className: \"nav-link\",\n        href: \"javascript:void(0)\",\n        onClick: this.signOut\n      }, \"\\u9000\\u51FA\")))))));\n    }\n  }]);\n\n  return Head;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component), _defineProperty(_class2, \"propTypes\", {\n  userinfo: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,\n  signOut: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired\n}), _temp)) || _class) || _class);\n\n\n//# sourceURL=webpack:///./src/components/head/index.js?");

/***/ }),

/***/ "./src/components/head/style.scss":
/*!****************************************!*\
  !*** ./src/components/head/style.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\t\"iconfont\": \"style_iconfont__212Hl\",\n\t\"icon-right\": \"style_icon-right__5WAlG\",\n\t\"test\": \"style_test__13LiP\"\n};\n\n//# sourceURL=webpack:///./src/components/head/style.scss?");

/***/ }),

/***/ "./src/components/ui/loading/index.js":
/*!********************************************!*\
  !*** ./src/components/ui/loading/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LoadingMore; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_css_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-css-modules */ \"react-css-modules\");\n/* harmony import */ var react_css_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_css_modules__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ \"./src/components/ui/loading/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_2__);\nvar _dec, _class;\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar LoadingMore = (_dec = react_css_modules__WEBPACK_IMPORTED_MODULE_1___default()(_style_scss__WEBPACK_IMPORTED_MODULE_2___default.a), _dec(_class =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(LoadingMore, _Component);\n\n  function LoadingMore(props) {\n    _classCallCheck(this, LoadingMore);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(LoadingMore).call(this, props));\n  }\n\n  _createClass(LoadingMore, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props$text = this.props.text,\n          text = _this$props$text === void 0 ? '正在加载中...' : _this$props$text;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        styleName: \"loading\"\n      }), text);\n    }\n  }]);\n\n  return LoadingMore;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"])) || _class);\n\n\n//# sourceURL=webpack:///./src/components/ui/loading/index.js?");

/***/ }),

/***/ "./src/components/ui/loading/style.scss":
/*!**********************************************!*\
  !*** ./src/components/ui/loading/style.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\t\"loading\": \"style_loading__1QJkZ\"\n};\n\n//# sourceURL=webpack:///./src/components/ui/loading/style.scss?");

/***/ }),

/***/ "./src/pages/bangumi/load-data.js":
/*!****************************************!*\
  !*** ./src/pages/bangumi/load-data.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_detail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/detail */ \"./src/actions/detail.js\");\n/* harmony import */ var _actions_playlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/playlist */ \"./src/actions/playlist.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var store = _ref.store,\n      match = _ref.match;\n  return new Promise(\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(resolve, reject) {\n      var id;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              id = match.params.id;\n              _context.next = 3;\n              return Object(_actions_detail__WEBPACK_IMPORTED_MODULE_0__[\"detail\"])({\n                id: id\n              })(store.dispatch, store.getState);\n\n            case 3:\n              _context.next = 5;\n              return Object(_actions_playlist__WEBPACK_IMPORTED_MODULE_1__[\"playlist\"])({\n                id: id\n              })(store.dispatch, store.getState);\n\n            case 5:\n              resolve({\n                code: 200\n              });\n\n            case 6:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n\n    return function (_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n\n//# sourceURL=webpack:///./src/pages/bangumi/load-data.js?");

/***/ }),

/***/ "./src/pages/home/load-data.js":
/*!*************************************!*\
  !*** ./src/pages/home/load-data.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_posts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/posts */ \"./src/actions/posts.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var store = _ref.store,\n      match = _ref.match;\n  return new Promise(\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(resolve, reject) {\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return Object(_actions_posts__WEBPACK_IMPORTED_MODULE_0__[\"loadPostsList\"])({\n                id: 'home',\n                filter: {\n                  sort_by: \"create_at\",\n                  deleted: false,\n                  weaken: false\n                }\n              })(store.dispatch, store.getState);\n\n            case 2:\n              resolve({\n                code: 200\n              });\n\n            case 3:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n\n    return function (_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n\n//# sourceURL=webpack:///./src/pages/home/load-data.js?");

/***/ }),

/***/ "./src/pages/list/load-data.js":
/*!*************************************!*\
  !*** ./src/pages/list/load-data.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/list */ \"./src/actions/list.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var store = _ref.store,\n      match = _ref.match;\n  return new Promise(\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(resolve, reject) {\n      var _match$params, _match$params$id, id, _match$params$limit, limit, _match$params$order, order, _match$params$day, day;\n\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _match$params = match.params, _match$params$id = _match$params.id, id = _match$params$id === void 0 ? 'list' : _match$params$id, _match$params$limit = _match$params.limit, limit = _match$params$limit === void 0 ? 20 : _match$params$limit, _match$params$order = _match$params.order, order = _match$params$order === void 0 ? 'addtime' : _match$params$order, _match$params$day = _match$params.day, day = _match$params$day === void 0 ? 365 : _match$params$day;\n              _context.next = 3;\n              return Object(_actions_list__WEBPACK_IMPORTED_MODULE_0__[\"listLoad\"])({\n                id: id,\n                limit: limit,\n                order: order,\n                day: day\n              })(store.dispatch, store.getState);\n\n            case 3:\n              resolve({\n                code: 200\n              });\n\n            case 4:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n\n    return function (_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n\n//# sourceURL=webpack:///./src/pages/list/load-data.js?");

/***/ }),

/***/ "./src/pages/play/load-data.js":
/*!*************************************!*\
  !*** ./src/pages/play/load-data.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_detail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/detail */ \"./src/actions/detail.js\");\n/* harmony import */ var _actions_playlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/playlist */ \"./src/actions/playlist.js\");\n/* harmony import */ var _actions_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/player */ \"./src/actions/player.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var store = _ref.store,\n      match = _ref.match;\n  return new Promise(\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(resolve, reject) {\n      var _match$params, id, pid;\n\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _match$params = match.params, id = _match$params.id, pid = _match$params.pid;\n              _context.next = 3;\n              return Object(_actions_detail__WEBPACK_IMPORTED_MODULE_0__[\"detail\"])({\n                id: id\n              })(store.dispatch, store.getState);\n\n            case 3:\n              _context.next = 5;\n              return Object(_actions_playlist__WEBPACK_IMPORTED_MODULE_1__[\"playlist\"])({\n                id: id\n              })(store.dispatch, store.getState);\n\n            case 5:\n              _context.next = 7;\n              return Object(_actions_player__WEBPACK_IMPORTED_MODULE_2__[\"playerLoad\"])({\n                id: id,\n                pid: pid\n              })(store.dispatch, store.getState);\n\n            case 7:\n              resolve({\n                code: 200\n              });\n\n            case 8:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n\n    return function (_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n\n//# sourceURL=webpack:///./src/pages/play/load-data.js?");

/***/ }),

/***/ "./src/pages/posts-detail/load-data.js":
/*!*********************************************!*\
  !*** ./src/pages/posts-detail/load-data.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_posts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/posts */ \"./src/actions/posts.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var store = _ref.store,\n      match = _ref.match;\n  return new Promise(\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(resolve, reject) {\n      var id, _ref3, _ref4, err, data;\n\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              id = match.params.id;\n              _context.next = 3;\n              return Object(_actions_posts__WEBPACK_IMPORTED_MODULE_0__[\"loadPostsList\"])({\n                id: id,\n                filter: {\n                  _id: id,\n                  deleted: false,\n                  weaken: false\n                }\n              })(store.dispatch, store.getState);\n\n            case 3:\n              _ref3 = _context.sent;\n              _ref4 = _slicedToArray(_ref3, 2);\n              err = _ref4[0];\n              data = _ref4[1];\n\n              // 没有找到帖子，设置页面 http code 为404\n              if (err || data.length == 0) {\n                resolve({\n                  code: 404\n                });\n              } else {\n                resolve({\n                  code: 200\n                });\n              }\n\n            case 8:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n\n    return function (_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n\n//# sourceURL=webpack:///./src/pages/posts-detail/load-data.js?");

/***/ }),

/***/ "./src/pages/week/load-data.js":
/*!*************************************!*\
  !*** ./src/pages/week/load-data.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_week__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/week */ \"./src/actions/week.js\");\n/* harmony import */ var _actions_top__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/top */ \"./src/actions/top.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var store = _ref.store,\n      match = _ref.match;\n  return new Promise(\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _asyncToGenerator(\n    /*#__PURE__*/\n    regeneratorRuntime.mark(function _callee(resolve, reject) {\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return Object(_actions_week__WEBPACK_IMPORTED_MODULE_0__[\"weekLoad\"])({\n                id: 'weekList'\n              })(store.dispatch, store.getState);\n\n            case 2:\n              _context.next = 4;\n              return Object(_actions_top__WEBPACK_IMPORTED_MODULE_1__[\"topLoad\"])({\n                order: 'addtime',\n                area: ''\n              })(store.dispatch, store.getState);\n\n            case 4:\n              _context.next = 6;\n              return Object(_actions_top__WEBPACK_IMPORTED_MODULE_1__[\"topLoad\"])({\n                order: 'hits_month',\n                area: 'CN'\n              })(store.dispatch, store.getState);\n\n            case 6:\n              _context.next = 8;\n              return Object(_actions_top__WEBPACK_IMPORTED_MODULE_1__[\"topLoad\"])({\n                order: 'hits_month',\n                area: 'JP'\n              })(store.dispatch, store.getState);\n\n            case 8:\n              resolve({\n                code: 200\n              });\n\n            case 9:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n\n    return function (_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n\n//# sourceURL=webpack:///./src/pages/week/load-data.js?");

/***/ }),

/***/ "./src/reducers/detail.js":
/*!********************************!*\
  !*** ./src/reducers/detail.js ***!
  \********************************/
/*! exports provided: default, getDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return detail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDetail\", function() { return getDetail; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction detail() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'GET_DETAIL':\n      var id = action.id,\n          data = action.data;\n      state[id] = data;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n}\nvar getDetail = function getDetail(state, id) {\n  return state.detail[id] ? state.detail[id] : {};\n};\n\n//# sourceURL=webpack:///./src/reducers/detail.js?");

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: initialStateJSON, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initialStateJSON\", function() { return initialStateJSON; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ \"./src/reducers/user.js\");\n/* harmony import */ var _posts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./posts */ \"./src/reducers/posts.js\");\n/* harmony import */ var _week__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./week */ \"./src/reducers/week.js\");\n/* harmony import */ var _detail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./detail */ \"./src/reducers/detail.js\");\n/* harmony import */ var _playlist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./playlist */ \"./src/reducers/playlist.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./player */ \"./src/reducers/player.js\");\n/* harmony import */ var _top__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./top */ \"./src/reducers/top.js\");\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./list */ \"./src/reducers/list.js\");\n\n\n\n\n\n\n\n\n\n\nvar states = {\n  user: _user__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  posts: _posts__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  week: _week__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  detail: _detail__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  playlist: _playlist__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  player: _player__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  top: _top__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  list: _list__WEBPACK_IMPORTED_MODULE_9__[\"default\"] // 创建一个无数据的states，用于在服务端初始redux数据\n\n};\nvar _states = {};\n\nfor (var i in states) {\n  _states[i] = lodash_merge__WEBPACK_IMPORTED_MODULE_1___default()({}, states[i](), {});\n}\n\n_states = JSON.stringify(_states);\nvar initialStateJSON = _states; // reducer\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])(states));\n\n//# sourceURL=webpack:///./src/reducers/index.js?");

/***/ }),

/***/ "./src/reducers/list.js":
/*!******************************!*\
  !*** ./src/reducers/list.js ***!
  \******************************/
/*! exports provided: default, getList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return list; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getList\", function() { return getList; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction list() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'GET_LIST':\n      var id = action.id,\n          data = action.data;\n      state[id] = data;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n}\nvar getList = function getList(state, id) {\n  return state.list[id] ? state.list[id] : {};\n};\n\n//# sourceURL=webpack:///./src/reducers/list.js?");

/***/ }),

/***/ "./src/reducers/player.js":
/*!********************************!*\
  !*** ./src/reducers/player.js ***!
  \********************************/
/*! exports provided: default, getPlayerList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return player; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPlayerList\", function() { return getPlayerList; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction player() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'GET_PLAYER':\n      var id = action.id,\n          data = action.data,\n          pid = action.pid;\n      state[\"\".concat(id, \"-\").concat(pid)] = data;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n}\nvar getPlayerList = function getPlayerList(state, id, pid) {\n  return state.player[\"\".concat(id, \"-\").concat(pid)] ? state.player[\"\".concat(id, \"-\").concat(pid)] : {};\n};\n\n//# sourceURL=webpack:///./src/reducers/player.js?");

/***/ }),

/***/ "./src/reducers/playlist.js":
/*!**********************************!*\
  !*** ./src/reducers/playlist.js ***!
  \**********************************/
/*! exports provided: default, getPlayList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return playlist; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPlayList\", function() { return getPlayList; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction playlist() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'GET_PLAY_LIST':\n      var id = action.id,\n          data = action.data;\n      state[id] = data;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n}\nvar getPlayList = function getPlayList(state, id) {\n  return state.playlist[id] ? state.playlist[id] : {};\n};\n\n//# sourceURL=webpack:///./src/reducers/playlist.js?");

/***/ }),

/***/ "./src/reducers/posts.js":
/*!*******************************!*\
  !*** ./src/reducers/posts.js ***!
  \*******************************/
/*! exports provided: default, getPostsListByListId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return posts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPostsListByListId\", function() { return getPostsListByListId; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nvar initialState = {};\nfunction posts() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'SET_POSTS':\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, action.state, {});\n\n    case 'SET_POSTS_LIST_BY_NAME':\n      var id = action.id,\n          data = action.data;\n      state[id] = data;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n}\nvar getPostsListByListId = function getPostsListByListId(state, id) {\n  return state.posts[id] ? state.posts[id] : {};\n};\n\n//# sourceURL=webpack:///./src/reducers/posts.js?");

/***/ }),

/***/ "./src/reducers/top.js":
/*!*****************************!*\
  !*** ./src/reducers/top.js ***!
  \*****************************/
/*! exports provided: default, getTopList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return top; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTopList\", function() { return getTopList; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction top() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'GET_TOP':\n      var order = action.order,\n          data = action.data,\n          area = action.area;\n      state[\"\".concat(order, \"-\").concat(area)] = data;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n}\nvar getTopList = function getTopList(state, order, area) {\n  var id = \"\".concat(order, \"-\").concat(area);\n  return state.top[id] ? state.top[id] : {};\n};\n\n//# sourceURL=webpack:///./src/reducers/top.js?");

/***/ }),

/***/ "./src/reducers/user.js":
/*!******************************!*\
  !*** ./src/reducers/user.js ***!
  \******************************/
/*! exports provided: default, getAccessToken, getUserInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return user; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAccessToken\", function() { return getAccessToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserInfo\", function() { return getUserInfo; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nvar initialState = {\n  accessToken: '',\n  userinfo: null\n};\nfunction user() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'SAVE_ACCESS_TOKEN':\n      state.accessToken = action.accessToken;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    case 'SAVE_USERINFO':\n      state.userinfo = action.userinfo;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n} // 获取 access token\n\nvar getAccessToken = function getAccessToken(state) {\n  return state.user.accessToken;\n}; // 获取用户信息\n\nvar getUserInfo = function getUserInfo(state) {\n  return state.user.userinfo || {};\n};\n\n//# sourceURL=webpack:///./src/reducers/user.js?");

/***/ }),

/***/ "./src/reducers/week.js":
/*!******************************!*\
  !*** ./src/reducers/week.js ***!
  \******************************/
/*! exports provided: default, getWeekByListId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return week; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getWeekByListId\", function() { return getWeekByListId; });\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n\nvar initialState = {};\nfunction week() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'GET_WEEK':\n      var id = action.id,\n          data = action.data;\n      state[id] = data;\n      return lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {});\n\n    default:\n      return state;\n  }\n}\nvar getWeekByListId = function getWeekByListId(state, id) {\n  return state.week[id] ? state.week[id] : {};\n};\n\n//# sourceURL=webpack:///./src/reducers/week.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ \"react-loadable\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/head */ \"./src/components/head/index.js\");\n/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ui/loading */ \"./src/components/ui/loading/index.js\");\n/* harmony import */ var _pages_home_load_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pages/home/load-data */ \"./src/pages/home/load-data.js\");\n/* harmony import */ var _pages_posts_detail_load_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pages/posts-detail/load-data */ \"./src/pages/posts-detail/load-data.js\");\n/* harmony import */ var _pages_play_load_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pages/play/load-data */ \"./src/pages/play/load-data.js\");\n/* harmony import */ var _pages_bangumi_load_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pages/bangumi/load-data */ \"./src/pages/bangumi/load-data.js\");\n/* harmony import */ var _pages_week_load_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pages/week/load-data */ \"./src/pages/week/load-data.js\");\n/* harmony import */ var _pages_list_load_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../pages/list/load-data */ \"./src/pages/list/load-data.js\");\n\n\n // 生成异步加载组件\n// import asyncRouteComponent from '../components/generateAsyncComponent.js';\n\n\n\n\n\n\n\n\n\n/**\n * 创建路由\n * @param  {Object} userinfo 用户信息，以此判断用户是否是登录状态，并控制页面访问权限\n * @return {[type]}\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (user) {\n  // 登录用户才能访问\n  var requireAuth = function requireAuth(Layout, props) {\n    if (!user) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Redirect\"], {\n        to: \"/sign-in\"\n      });\n    } else {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Layout, props);\n    }\n  }; // 游客才能访问\n\n\n  var requireTourists = function requireTourists(Layout, props) {\n    if (user) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Redirect\"], {\n        to: \"/\"\n      });\n    } else {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Layout, props);\n    }\n  }; // 大家都可以访问\n\n\n  var triggerEnter = function triggerEnter(Layout, props) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Layout, props);\n  }; // 路由数组\n\n\n  var routeArr = [{\n    path: '/',\n    exact: true,\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    // component: asyncRouteComponent({\n    //   loader: () => import('../pages/home')\n    // }),\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../pages/home */ \"./src/pages/home/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: requireAuth,\n    loadData: _pages_home_load_data__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  }, {\n    path: '/posts/:id',\n    exact: true,\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    // component: asyncRouteComponent({\n    //   loader: () => import('../pages/posts-detail')\n    // }),\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ../pages/posts-detail */ \"./src/pages/posts-detail/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: requireAuth,\n    loadData: _pages_posts_detail_load_data__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n  }, {\n    path: '/topics',\n    exact: true,\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    // component: asyncRouteComponent({\n    //   loader: () => import('../pages/topics')\n    // }),\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ../pages/topics */ \"./src/pages/topics/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: requireAuth\n  }, {\n    path: '/sign-in',\n    exact: true,\n    // head: Head,\n    // component: asyncRouteComponent({\n    // loader: () => import('../pages/sign-in')\n    // }),\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ../pages/sign-in */ \"./src/pages/sign-in/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: requireTourists\n  }, {\n    path: '/week',\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ../pages/week */ \"./src/pages/week/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: triggerEnter,\n    loadData: _pages_week_load_data__WEBPACK_IMPORTED_MODULE_9__[\"default\"]\n  }, {\n    path: '/bangumi/:id',\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, /*! ../pages/bangumi */ \"./src/pages/bangumi/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: triggerEnter,\n    loadData: _pages_bangumi_load_data__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n  }, {\n    path: '/play/:id/:pid',\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ../pages/play */ \"./src/pages/play/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: triggerEnter,\n    loadData: _pages_play_load_data__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n  }, {\n    path: '/list',\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ../pages/list */ \"./src/pages/list/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: triggerEnter,\n    loadData: _pages_list_load_data__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n  }, {\n    path: '**',\n    head: _components_head__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    // component: asyncRouteComponent({\n    //   loader: () => import('../pages/not-found')\n    // }),\n    component: react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n      loader: function loader() {\n        return __webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! ../pages/not-found */ \"./src/pages/not-found/index.js\"));\n      },\n      loading: function loading() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null);\n      }\n    }),\n    enter: triggerEnter\n  }];\n\n  var router = function router() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, routeArr.map(function (route, index) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n        key: index,\n        path: route.path,\n        exact: route.exact,\n        component: route.head\n      });\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, routeArr.map(function (route, index) {\n      if (route.component) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n          key: index,\n          path: route.path,\n          exact: route.exact,\n          component: function component(props) {\n            return route.enter(route.component, props);\n          }\n        });\n      }\n    })));\n  };\n\n  return {\n    list: routeArr,\n    dom: router\n  };\n});\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var config = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n\n__webpack_require__(/*! @babel/register */ \"@babel/register\");\n\n__webpack_require__(/*! @babel/polyfill */ \"@babel/polyfill\");\n\n__webpack_require__(/*! css-modules-require-hook */ \"css-modules-require-hook\")({\n  generateScopedName: config.class_scoped_name,\n  extensions: ['.scss', '.css']\n});\n\n__webpack_require__(/*! ./server */ \"./src/server/server.js\");\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_document_meta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-document-meta */ \"react-document-meta\");\n/* harmony import */ var react_document_meta__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_document_meta__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ejs */ \"ejs\");\n/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ejs__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-loadable */ \"react-loadable\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../store */ \"./src/store/index.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../router */ \"./src/router/index.js\");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../reducers */ \"./src/reducers/index.js\");\n/* harmony import */ var _actions_user__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../actions/user */ \"./src/actions/user.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _sign__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./sign */ \"./src/server/sign.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\n\n // 服务端渲染依赖\n\n\n\n\n\n // 路由配置\n\n // 路由组件\n\n // 路由初始化的redux内容\n\n\n // 配置\n\n\n // import webpackHotMiddleware from './webpack-hot-middleware';\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()(); // ***** 注意 *****\n// 不要改变如下代码执行位置，否则热更新会失效\n// 开发环境开启修改代码后热更新\n// if (process.env.NODE_ENV === 'development') {\n// webpackHotMiddleware(app);\n// }\n// console.log(process.env.NODE_ENV);\n// app.set(\"view engine\",\"ejs\");\n\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: true\n}));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(compression__WEBPACK_IMPORTED_MODULE_4___default()()); // app.use(express.static('./dist'));\n\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static('./dist/client')); // app.use(express.static('./'));\n// console.log(express.static(__dirname + '/dist'));\n// 登录、退出\n\napp.use('/sign', Object(_sign__WEBPACK_IMPORTED_MODULE_17__[\"default\"])());\napp.get('*',\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee3(req, res) {\n    var store, user, accessToken, router, _route, _match, context, loadAsyncRouterComponent, _Router, html, reduxState, meta;\n\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            store = Object(_store__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(JSON.parse(_reducers__WEBPACK_IMPORTED_MODULE_14__[\"initialStateJSON\"]));\n            user = null;\n            accessToken = req.cookies[_config__WEBPACK_IMPORTED_MODULE_16__[\"auth_cookie_name\"]] || ''; // 验证 token 是否有效\n\n            if (accessToken) {\n              // 这里可以去查询 accessToken 是否有效\n              // your code\n              // 这里假设如果有 accessToken ，那么就是登录用户，将他保存到redux中\n              user = {\n                id: '001',\n                nickname: accessToken\n              }; // 储存用户信息\n\n              store.dispatch(Object(_actions_user__WEBPACK_IMPORTED_MODULE_15__[\"saveUserInfo\"])({\n                userinfo: user\n              })); // 储存access token\n\n              store.dispatch(Object(_actions_user__WEBPACK_IMPORTED_MODULE_15__[\"saveAccessToken\"])({\n                accessToken: accessToken\n              }));\n            }\n\n            router = Object(_router__WEBPACK_IMPORTED_MODULE_13__[\"default\"])(user);\n            _route = null, _match = null;\n            router.list.some(function (route) {\n              var match = Object(react_router__WEBPACK_IMPORTED_MODULE_9__[\"matchPath\"])(req.url.split('?')[0], route);\n\n              if (match && match.path) {\n                _route = route;\n                _match = match;\n                return true;\n              }\n            });\n            context = {\n              code: 200 // url\n\n            }; // 加载异步路由组件\n\n            loadAsyncRouterComponent = function loadAsyncRouterComponent() {\n              return new Promise(\n              /*#__PURE__*/\n              function () {\n                var _ref2 = _asyncToGenerator(\n                /*#__PURE__*/\n                regeneratorRuntime.mark(function _callee2(resolve) {\n                  return regeneratorRuntime.wrap(function _callee2$(_context2) {\n                    while (1) {\n                      switch (_context2.prev = _context2.next) {\n                        case 0:\n                          _context2.next = 2;\n                          return _route.component.load(\n                          /*#__PURE__*/\n                          function () {\n                            var _ref3 = _asyncToGenerator(\n                            /*#__PURE__*/\n                            regeneratorRuntime.mark(function _callee(ResolvedComponent) {\n                              var loadData, result;\n                              return regeneratorRuntime.wrap(function _callee$(_context) {\n                                while (1) {\n                                  switch (_context.prev = _context.next) {\n                                    case 0:\n                                      loadData = ResolvedComponent.WrappedComponent.defaultProps.loadData;\n                                      _context.next = 3;\n                                      return loadData({\n                                        store: store,\n                                        match: _match\n                                      });\n\n                                    case 3:\n                                      result = _context.sent;\n                                      resolve(result);\n\n                                    case 5:\n                                    case \"end\":\n                                      return _context.stop();\n                                  }\n                                }\n                              }, _callee, this);\n                            }));\n\n                            return function (_x4) {\n                              return _ref3.apply(this, arguments);\n                            };\n                          }());\n\n                        case 2:\n                        case \"end\":\n                          return _context2.stop();\n                      }\n                    }\n                  }, _callee2, this);\n                }));\n\n                return function (_x3) {\n                  return _ref2.apply(this, arguments);\n                };\n              }());\n            }; // console.log(_route.component);\n            // console.log(_route.component.loadData);\n\n\n            if (!_route.loadData) {\n              _context3.next = 13;\n              break;\n            }\n\n            _context3.next = 12;\n            return _route.loadData({\n              store: store,\n              match: _match\n            });\n\n          case 12:\n            context = _context3.sent;\n\n          case 13:\n            _context3.next = 15;\n            return _route.component.preload();\n\n          case 15:\n            // await Loadable.preloadAll();\n            // if (_route.component.load || _route.loadData) {\n            // 在服务端加载异步组件\n            // context = await loadAsyncRouterComponent();\n            // }\n            // 获取路由dom\n            _Router = router.dom; // console.log(_Router);\n\n            html = react_dom_server__WEBPACK_IMPORTED_MODULE_8___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_10__[\"Provider\"], {\n              store: store\n            }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_9__[\"StaticRouter\"], {\n              location: req.url,\n              context: context\n            }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_Router, null))));\n            reduxState = JSON.stringify(store.getState()).replace(/</g, '\\\\x3c'); // 获取页面的meta，嵌套到模版中\n\n            meta = react_document_meta__WEBPACK_IMPORTED_MODULE_5___default.a.renderAsHTML();\n\n            if (context.code == 301) {\n              res.writeHead(301, {\n                Location: context.url\n              });\n            } else {\n              res.status(context.code);\n              res.render('../dist/server/index.ejs', {\n                html: html,\n                reduxState: reduxState,\n                meta: meta\n              }); // res.render('../dist/index.ejs', { html, reduxState, meta });\n            }\n\n            res.end();\n\n          case 21:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, this);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\napp.listen(_config__WEBPACK_IMPORTED_MODULE_16__[\"port\"]);\nconsole.log('server started on port ' + _config__WEBPACK_IMPORTED_MODULE_16__[\"port\"]);\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "./src/server/sign.js":
/*!****************************!*\
  !*** ./src/server/sign.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);\n\n // (安全实施) 服务端储存 token cookie 设置成httpOnly\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n  router.post('/in', function (req, res) {\n    var userinfo = req.body.userinfo;\n    res.cookie(_config__WEBPACK_IMPORTED_MODULE_1__[\"auth_cookie_name\"], userinfo.nickname, {\n      path: '/',\n      httpOnly: true,\n      maxAge: 1000 * 60 * 60 * 24 * 30\n    });\n    res.send({\n      success: true\n    });\n  });\n  router.post('/out', function (req, res) {\n    res.clearCookie(_config__WEBPACK_IMPORTED_MODULE_1__[\"auth_cookie_name\"]);\n    res.send({\n      success: true\n    });\n  });\n  return router;\n});\n\n//# sourceURL=webpack:///./src/server/sign.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return configureStore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers */ \"./src/reducers/index.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-logger */ \"redux-logger\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a]; // 如果是在客户端环境，并且是开发模式，那么打印redux日志\n\nif (false) {}\nfunction configureStore(initialState) {\n  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_2__[\"default\"], initialState, Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"])(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"].apply(void 0, middleware)));\n\n  if (true) {\n    // Enable Webpack hot module replacement for reducers\n    module.hot.accept(/*! ../reducers */ \"./src/reducers/index.js\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers */ \"./src/reducers/index.js\");\n(function () {\n      var nextRootReducer = __webpack_require__(/*! ../reducers/index */ \"./src/reducers/index.js\");\n\n      store.replaceReducer(nextRootReducer);\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });\n  }\n\n  return store;\n}\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/utils/config.js":
/*!*****************************!*\
  !*** ./src/utils/config.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  api: {\n    login: 'https://www.ikanfan.com/api.php?s=home-search-login',\n    playlist: function playlist(_ref) {\n      var id = _ref.id;\n      return \"https://www.ikanfan.com/api.php?s=home-vod-playerJson-id-\".concat(id, \"-react-1\");\n    },\n    // 播放列表 id:视频id\n    player: function player(_ref2) {\n      var id = _ref2.id,\n          pid = _ref2.pid;\n      return \"https://www.ikanfan.com/api.php?s=home-vod-playerJson-id-\".concat(id, \"-pid-\").concat(pid);\n    },\n    // 单集 id:视频id，pid，集数\n    detail: function detail(_ref3) {\n      var id = _ref3.id;\n      return \"https://www.ikanfan.com/api.php?s=home-search-reactDetail&q=\".concat(id);\n    },\n    // 视频详情\n    newsDetail: 'https://www.ikanfan.com/api.php?s=home-news-readdetail-id-',\n    // 新闻内容接口\n    week: function week(_ref4) {\n      var limit = _ref4.limit;\n      return \"https://www.ikanfan.com/api.php?s=home-search-reactWeek&limit=\".concat(limit);\n    },\n    // 每周追番\n\n    /**\n    * 排行榜\n    * $hits\n    * hits 总排行\n    * hits_week \t周排行\n    * hits_day  \t日排行\n    * hits_month\t月排行\n    * addtime\t\t按最新\n    * area\t\t\t按地区，默认全部，日本，国产\n    * lz\t\t\t是否连载 1 为连载 0 完结\n    */\n    top: function top(_ref5) {\n      var order = _ref5.order,\n          area = _ref5.area,\n          lz = _ref5.lz;\n      return \"https://www.ikanfan.com/api.php?s=home-search-reactlist&order=\".concat(order).concat(area ? \"&area=\".concat(area) : '').concat(lz ? \"&lz=\".concat(lz) : '');\n    },\n    //获取列表\n    typelist: function typelist(_ref6) {\n      var _ref6$id = _ref6.id,\n          id = _ref6$id === void 0 ? 3 : _ref6$id,\n          _ref6$mcid = _ref6.mcid,\n          mcid = _ref6$mcid === void 0 ? '' : _ref6$mcid,\n          _ref6$area = _ref6.area,\n          area = _ref6$area === void 0 ? '' : _ref6$area,\n          _ref6$year = _ref6.year,\n          year = _ref6$year === void 0 ? '' : _ref6$year,\n          _ref6$letter = _ref6.letter,\n          letter = _ref6$letter === void 0 ? '' : _ref6$letter,\n          _ref6$order = _ref6.order,\n          order = _ref6$order === void 0 ? 'addtime' : _ref6$order,\n          _ref6$limit = _ref6.limit,\n          limit = _ref6$limit === void 0 ? 30 : _ref6$limit,\n          _ref6$lz = _ref6.lz,\n          lz = _ref6$lz === void 0 ? '' : _ref6$lz,\n          _ref6$page = _ref6.page,\n          page = _ref6$page === void 0 ? 1 : _ref6$page;\n      return \"https://www.ikanfan.com/api.php?s=home-vod-ajaxtype-id-\".concat(id, \"-mcid-\").concat(mcid, \"-area-\").concat(area, \"-year-\").concat(year, \"-letter-\").concat(letter, \"-order-\").concat(order, \"-limit-\").concat(limit, \"-lz-\").concat(lz, \"-p-\").concat(page);\n    } // 列表接口\n\n  }\n});\n\n//# sourceURL=webpack:///./src/utils/config.js?");

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi @babel/polyfill ./src/server/index ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"@babel/polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/server/index */\"./src/server/index.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_./src/server/index?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "@babel/register":
/*!**********************************!*\
  !*** external "@babel/register" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/register\");\n\n//# sourceURL=webpack:///external_%22@babel/register%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "css-modules-require-hook":
/*!*******************************************!*\
  !*** external "css-modules-require-hook" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"css-modules-require-hook\");\n\n//# sourceURL=webpack:///external_%22css-modules-require-hook%22?");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ejs\");\n\n//# sourceURL=webpack:///external_%22ejs%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "lodash/merge":
/*!*******************************!*\
  !*** external "lodash/merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash/merge\");\n\n//# sourceURL=webpack:///external_%22lodash/merge%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"prop-types\");\n\n//# sourceURL=webpack:///external_%22prop-types%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-css-modules":
/*!************************************!*\
  !*** external "react-css-modules" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-css-modules\");\n\n//# sourceURL=webpack:///external_%22react-css-modules%22?");

/***/ }),

/***/ "react-document-meta":
/*!**************************************!*\
  !*** external "react-document-meta" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-document-meta\");\n\n//# sourceURL=webpack:///external_%22react-document-meta%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-loadable":
/*!*********************************!*\
  !*** external "react-loadable" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-loadable\");\n\n//# sourceURL=webpack:///external_%22react-loadable%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-logger\");\n\n//# sourceURL=webpack:///external_%22redux-logger%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ })

/******/ });