import { __extends, __read } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import 'js-marker-clusterer';
import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
var ClusterManager = /** @class */ (function (_super) {
    __extends(ClusterManager, _super);
    function ClusterManager(_mapsWrapper, _zone) {
        var _this = _super.call(this, _mapsWrapper, _zone) || this;
        _this._mapsWrapper = _mapsWrapper;
        _this._zone = _zone;
        _this._clustererInstance = new Promise(function (resolver) {
            _this._resolver = resolver;
        });
        return _this;
    }
    ClusterManager.prototype.init = function (options) {
        var _this = this;
        this._mapsWrapper.getNativeMap().then(function (map) {
            var clusterer = new MarkerClusterer(map, [], options);
            _this._resolver(clusterer);
        });
    };
    ClusterManager.prototype.getClustererInstance = function () {
        return this._clustererInstance;
    };
    ClusterManager.prototype.addMarker = function (marker) {
        var clusterPromise = this.getClustererInstance();
        var markerPromise = this._mapsWrapper
            .createMarker({
            position: {
                lat: marker.latitude,
                lng: marker.longitude,
            },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title,
            clickable: marker.clickable,
        }, false);
        Promise
            .all([clusterPromise, markerPromise])
            .then(function (_a) {
            var _b = __read(_a, 2), cluster = _b[0], marker = _b[1];
            return cluster.addMarker(marker);
        });
        this._markers.set(marker, markerPromise);
    };
    ClusterManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            _this._zone.run(function () {
                m.setMap(null);
                _this.getClustererInstance().then(function (cluster) {
                    cluster.removeMarker(m);
                    _this._markers.delete(marker);
                });
            });
        });
    };
    ClusterManager.prototype.clearMarkers = function () {
        return this.getClustererInstance().then(function (cluster) {
            cluster.clearMarkers();
        });
    };
    ClusterManager.prototype.setGridSize = function (c) {
        this.getClustererInstance().then(function (cluster) {
            cluster.setGridSize(c.gridSize);
        });
    };
    ClusterManager.prototype.setMaxZoom = function (c) {
        this.getClustererInstance().then(function (cluster) {
            cluster.setMaxZoom(c.maxZoom);
        });
    };
    ClusterManager.prototype.setStyles = function (c) {
        this.getClustererInstance().then(function (cluster) {
            cluster.setStyles(c.styles);
        });
    };
    ClusterManager.prototype.setZoomOnClick = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.zoomOnClick !== undefined) {
                cluster.zoomOnClick_ = c.zoomOnClick;
            }
        });
    };
    ClusterManager.prototype.setAverageCenter = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.averageCenter !== undefined) {
                cluster.averageCenter_ = c.averageCenter;
            }
        });
    };
    ClusterManager.prototype.setImagePath = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.imagePath !== undefined) {
                cluster.imagePath_ = c.imagePath;
            }
        });
    };
    ClusterManager.prototype.setMinimumClusterSize = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.minimumClusterSize !== undefined) {
                cluster.minimumClusterSize_ = c.minimumClusterSize;
            }
        });
    };
    ClusterManager.prototype.setImageExtension = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.imageExtension !== undefined) {
                cluster.imageExtension_ = c.imageExtension;
            }
        });
    };
    ClusterManager.prototype.createClusterEventObservable = function (eventName) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._zone.runOutsideAngular(function () {
                _this._clustererInstance.then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        });
    };
    ClusterManager.prototype.setCalculator = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (typeof c.calculator === 'function') {
                cluster.setCalculator(c.calculator);
            }
        });
    };
    ClusterManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    ClusterManager.decorators = [
        { type: Injectable }
    ];
    ClusterManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return ClusterManager;
}(MarkerManager));
export { ClusterManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9qcy1tYXJrZXItY2x1c3RlcmVyLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvY2x1c3Rlci1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPM0U7SUFDb0Msa0NBQWE7SUFJL0Msd0JBQXNCLFlBQWtDLEVBQVksS0FBYTtRQUFqRixZQUNFLGtCQUFNLFlBQVksRUFBRSxLQUFLLENBQUMsU0FJM0I7UUFMcUIsa0JBQVksR0FBWixZQUFZLENBQXNCO1FBQVksV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUUvRSxLQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLENBQTBCLFVBQUMsUUFBUTtZQUN0RSxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQzs7SUFDTCxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLE9BQXVCO1FBQTVCLGlCQUtDO1FBSkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ3ZDLElBQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNq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RixVQUFVOzs7Z0JBUFMsb0JBQW9CO2dCQUxuQixNQUFNOztJQStKM0IscUJBQUM7Q0FBQSxBQW5KRCxDQUNvQyxhQUFhLEdBa0poRDtTQWxKWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgJ2pzLW1hcmtlci1jbHVzdGVyZXInO1xuXG5pbXBvcnQgeyBBZ21NYXJrZXIsIEdvb2dsZU1hcHNBUElXcmFwcGVyLCBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnQGFnbS9jb3JlJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJ0BhZ20vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBBZ21NYXJrZXJDbHVzdGVyIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9tYXJrZXItY2x1c3Rlcic7XG5pbXBvcnQgeyBDbHVzdGVyT3B0aW9ucywgTWFya2VyQ2x1c3RlcmVySW5zdGFuY2UgfSBmcm9tICcuLi9nb29nbGUtY2x1c3RlcmVyLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgTWFya2VyQ2x1c3RlcmVyOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDbHVzdGVyTWFuYWdlciBleHRlbmRzIE1hcmtlck1hbmFnZXIge1xuICBwcml2YXRlIF9jbHVzdGVyZXJJbnN0YW5jZTogUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZT47XG4gIHByaXZhdGUgX3Jlc29sdmVyOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJvdGVjdGVkIF96b25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcihfbWFwc1dyYXBwZXIsIF96b25lKTtcbiAgICB0aGlzLl9jbHVzdGVyZXJJbnN0YW5jZSA9IG5ldyBQcm9taXNlPE1hcmtlckNsdXN0ZXJlckluc3RhbmNlPigocmVzb2x2ZXIpID0+IHtcbiAgICAgIHRoaXMuX3Jlc29sdmVyID0gcmVzb2x2ZXI7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KG9wdGlvbnM6IENsdXN0ZXJPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbihtYXAgPT4ge1xuICAgICAgY29uc3QgY2x1c3RlcmVyID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIFtdLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX3Jlc29sdmVyKGNsdXN0ZXJlcik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDbHVzdGVyZXJJbnN0YW5jZSgpOiBQcm9taXNlPE1hcmtlckNsdXN0ZXJlckluc3RhbmNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NsdXN0ZXJlckluc3RhbmNlO1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlcjogQWdtTWFya2VyKTogdm9pZCB7XG4gICAgY29uc3QgY2x1c3RlclByb21pc2U6IFByb21pc2U8TWFya2VyQ2x1c3RlcmVySW5zdGFuY2U+ID0gdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpO1xuICAgIGNvbnN0IG1hcmtlclByb21pc2UgPSB0aGlzLl9tYXBzV3JhcHBlclxuICAgICAgLmNyZWF0ZU1hcmtlcih7XG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgbGF0OiBtYXJrZXIubGF0aXR1ZGUsXG4gICAgICAgICAgbG5nOiBtYXJrZXIubG9uZ2l0dWRlLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDogbWFya2VyLmxhYmVsLFxuICAgICAgICBkcmFnZ2FibGU6IG1hcmtlci5kcmFnZ2FibGUsXG4gICAgICAgIGljb246IG1hcmtlci5pY29uVXJsLFxuICAgICAgICBvcGFjaXR5OiBtYXJrZXIub3BhY2l0eSxcbiAgICAgICAgdmlzaWJsZTogbWFya2VyLnZpc2libGUsXG4gICAgICAgIHpJbmRleDogbWFya2VyLnpJbmRleCxcbiAgICAgICAgdGl0bGU6IG1hcmtlci50aXRsZSxcbiAgICAgICAgY2xpY2thYmxlOiBtYXJrZXIuY2xpY2thYmxlLFxuICAgICAgfSwgZmFsc2UpO1xuXG4gICAgUHJvbWlzZVxuICAgICAgLmFsbChbY2x1c3RlclByb21pc2UsIG1hcmtlclByb21pc2VdKVxuICAgICAgLnRoZW4oKFtjbHVzdGVyLCBtYXJrZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiBjbHVzdGVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgICAgfSk7XG4gICAgdGhpcy5fbWFya2Vycy5zZXQobWFya2VyLCBtYXJrZXJQcm9taXNlKTtcbiAgfVxuXG4gIGRlbGV0ZU1hcmtlcihtYXJrZXI6IEFnbU1hcmtlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG0gPSB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIC8vIG1hcmtlciBhbHJlYWR5IGRlbGV0ZWRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbigobTogTWFya2VyKSA9PiB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIG0uc2V0TWFwKG51bGwpO1xuICAgICAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcbiAgICAgICAgICBjbHVzdGVyLnJlbW92ZU1hcmtlcihtKTtcbiAgICAgICAgICB0aGlzLl9tYXJrZXJzLmRlbGV0ZShtYXJrZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJNYXJrZXJzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcbiAgICAgIGNsdXN0ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRHcmlkU2l6ZShjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICBjbHVzdGVyLnNldEdyaWRTaXplKGMuZ3JpZFNpemUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TWF4Wm9vbShjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICBjbHVzdGVyLnNldE1heFpvb20oYy5tYXhab29tKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFN0eWxlcyhjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICBjbHVzdGVyLnNldFN0eWxlcyhjLnN0eWxlcyk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRab29tT25DbGljayhjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICBpZiAoYy56b29tT25DbGljayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsdXN0ZXIuem9vbU9uQ2xpY2tfID0gYy56b29tT25DbGljaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldEF2ZXJhZ2VDZW50ZXIoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgaWYgKGMuYXZlcmFnZUNlbnRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsdXN0ZXIuYXZlcmFnZUNlbnRlcl8gPSBjLmF2ZXJhZ2VDZW50ZXI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbWFnZVBhdGgoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgaWYgKGMuaW1hZ2VQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3Rlci5pbWFnZVBhdGhfID0gYy5pbWFnZVBhdGg7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRNaW5pbXVtQ2x1c3RlclNpemUoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgaWYgKGMubWluaW11bUNsdXN0ZXJTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3Rlci5taW5pbXVtQ2x1c3RlclNpemVfID0gYy5taW5pbXVtQ2x1c3RlclNpemU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbWFnZUV4dGVuc2lvbihjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICBpZiAoYy5pbWFnZUV4dGVuc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsdXN0ZXIuaW1hZ2VFeHRlbnNpb25fID0gYy5pbWFnZUV4dGVuc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUNsdXN0ZXJFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NsdXN0ZXJlckluc3RhbmNlLnRoZW4oKG06IE1hcmtlckNsdXN0ZXJlckluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgbS5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRDYWxjdWxhdG9yIChjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICBpZiAodHlwZW9mIGMuY2FsY3VsYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjbHVzdGVyLnNldENhbGN1bGF0b3IoYy5jYWxjdWxhdG9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19