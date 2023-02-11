import { __awaiter } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
export class PolylineManager {
    constructor(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    static _convertPoints(line) {
        const path = line._getPoints().map((point) => {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    }
    static _convertPath(path) {
        const symbolPath = google.maps.SymbolPath[path];
        if (typeof symbolPath === 'number') {
            return symbolPath;
        }
        else {
            return path;
        }
    }
    static _convertIcons(line) {
        const icons = line._getIcons().map(agmIcon => ({
            fixedRotation: agmIcon.fixedRotation,
            offset: agmIcon.offset,
            repeat: agmIcon.repeat,
            icon: {
                anchor: new google.maps.Point(agmIcon.anchorX, agmIcon.anchorY),
                fillColor: agmIcon.fillColor,
                fillOpacity: agmIcon.fillOpacity,
                path: PolylineManager._convertPath(agmIcon.path),
                rotation: agmIcon.rotation,
                scale: agmIcon.scale,
                strokeColor: agmIcon.strokeColor,
                strokeOpacity: agmIcon.strokeOpacity,
                strokeWeight: agmIcon.strokeWeight,
            },
        }));
        // prune undefineds;
        icons.forEach(icon => {
            Object.entries(icon).forEach(([key, val]) => {
                if (typeof val === 'undefined') {
                    delete icon[key];
                }
            });
            if (typeof icon.icon.anchor.x === 'undefined' ||
                typeof icon.icon.anchor.y === 'undefined') {
                delete icon.icon.anchor;
            }
        });
        return icons;
    }
    addPolyline(line) {
        const polylinePromise = this._mapsWrapper.getNativeMap()
            .then(() => [PolylineManager._convertPoints(line),
            PolylineManager._convertIcons(line)])
            .then(([path, icons]) => this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path: path,
            icons: icons,
        }));
        this._polylines.set(line, polylinePromise);
    }
    updatePolylinePoints(line) {
        const path = PolylineManager._convertPoints(line);
        const m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => { return this._zone.run(() => { l.setPath(path); }); });
    }
    updateIconSequences(line) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._mapsWrapper.getNativeMap();
            const icons = PolylineManager._convertIcons(line);
            const m = this._polylines.get(line);
            if (m == null) {
                return;
            }
            return m.then(l => this._zone.run(() => l.setOptions({ icons: icons })));
        });
    }
    setPolylineOptions(line, options) {
        return this._polylines.get(line).then((l) => { l.setOptions(options); });
    }
    deletePolyline(line) {
        const m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.setMap(null);
                this._polylines.delete(line);
            });
        });
    }
    getMVCPath(agmPolyline) {
        return __awaiter(this, void 0, void 0, function* () {
            const polyline = yield this._polylines.get(agmPolyline);
            return polyline.getPath();
        });
    }
    getPath(agmPolyline) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getMVCPath(agmPolyline)).getArray();
        });
    }
    createEventObservable(eventName, line) {
        return new Observable((observer) => {
            this._polylines.get(line).then((l) => {
                l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    createPathEventObservable(line) {
        return __awaiter(this, void 0, void 0, function* () {
            const mvcPath = yield this.getMVCPath(line);
            return createMVCEventObservable(mvcPath);
        });
    }
}
PolylineManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
PolylineManager.decorators = [
    { type: Injectable }
];
PolylineManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNbEUsTUFBTSxPQUFPLGVBQWU7SUFJMUIsWUFBb0IsWUFBa0MsRUFBVSxLQUFhO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIckUsZUFBVSxHQUNkLElBQUksR0FBRyxFQUFrQyxDQUFDO0lBRWtDLENBQUM7SUFFekUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFpQjtRQUM3QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBdUIsRUFBRSxFQUFFO1lBQzdELE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBa0IsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFDRztRQUM3QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNsQyxPQUFPLFVBQVUsQ0FBQztTQUNuQjthQUFLO1lBQ0osT0FBTyxJQUFJ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QUMsSUFBSSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUU7Z0JBQzdDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLHlCQUF5QixDQUFDLElBQWlCOztZQUMvQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsT0FBTyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQUE7OztZQWpJaUMsb0JBQW9CO1lBQWlCLE1BQU07OztZQUw5RSxVQUFVOzs7WUFMRixvQkFBb0I7WUFOUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBZ21Qb2x5bGluZSwgUGF0aEV2ZW50IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9wb2x5bGluZSc7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9wb2x5bGluZS1wb2ludCc7XG5pbXBvcnQgeyBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi91dGlscy9tdmNhcnJheS11dGlscyc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCB7IEljb25TZXF1ZW5jZSwgTGF0TG5nLCBMYXRMbmdMaXRlcmFsLCBNVkNBcnJheSwgUG9seWxpbmUgfSBmcm9tICcuLi9nb29nbGUtbWFwcy10eXBlcyc7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9seWxpbmVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfcG9seWxpbmVzOiBNYXA8QWdtUG9seWxpbmUsIFByb21pc2U8UG9seWxpbmU+PiA9XG4gICAgICBuZXcgTWFwPEFnbVBvbHlsaW5lLCBQcm9taXNlPFBvbHlsaW5lPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cblxuICBwcml2YXRlIHN0YXRpYyBfY29udmVydFBvaW50cyhsaW5lOiBBZ21Qb2x5bGluZSk6IEFycmF5PExhdExuZ0xpdGVyYWw+IHtcbiAgICBjb25zdCBwYXRoID0gbGluZS5fZ2V0UG9pbnRzKCkubWFwKChwb2ludDogQWdtUG9seWxpbmVQb2ludCkgPT4ge1xuICAgICAgcmV0dXJuIHtsYXQ6IHBvaW50LmxhdGl0dWRlLCBsbmc6IHBvaW50LmxvbmdpdHVkZX0gYXMgTGF0TG5nTGl0ZXJhbDtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9jb252ZXJ0UGF0aChwYXRoOiAnQ0lSQ0xFJyB8ICdCQUNLV0FSRF9DTE9TRURfQVJST1cnIHwgJ0JBQ0tXQVJEX09QRU5fQVJST1cnIHwgJ0ZPUldBUkRfQ0xPU0VEX0FSUk9XJyB8XG4gICdGT1JXQVJEX0NMT1NFRF9BUlJPVycgfCBzdHJpbmcpOiBudW1iZXIgfCBzdHJpbmd7XG4gICAgY29uc3Qgc3ltYm9sUGF0aCA9IGdvb2dsZS5tYXBzLlN5bWJvbFBhdGhbcGF0aF07XG4gICAgaWYgKHR5cGVvZiBzeW1ib2xQYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIHN5bWJvbFBhdGg7XG4gICAgfSBlbHNle1xuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2NvbnZlcnRJY29ucyhsaW5lOiBBZ21Qb2x5bGluZSk6IEFycmF5PEljb25TZXF1ZW5jZT4ge1xuICAgIGNvbnN0IGljb25zID0gbGluZS5fZ2V0SWNvbnMoKS5tYXAoYWdtSWNvbiA9PiAoe1xuICAgICAgZml4ZWRSb3RhdGlvbjogYWdtSWNvbi5maXhlZFJvdGF0aW9uLFxuICAgICAgb2Zmc2V0OiBhZ21JY29uLm9mZnNldCxcbiAgICAgIHJlcGVhdDogYWdtSWNvbi5yZXBlYXQsXG4gICAgICBpY29uOiB7XG4gICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KGFnbUljb24uYW5jaG9yWCwgYWdtSWNvbi5hbmNob3JZKSxcbiAgICAgICAgZmlsbENvbG9yOiBhZ21JY29uLmZpbGxDb2xvcixcbiAgICAgICAgZmlsbE9wYWNpdHk6IGFnbUljb24uZmlsbE9wYWNpdHksXG4gICAgICAgIHBhdGg6IFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBhdGgoYWdtSWNvbi5wYXRoKSxcbiAgICAgICAgcm90YXRpb246IGFnbUljb24ucm90YXRpb24sXG4gICAgICAgIHNjYWxlOiBhZ21JY29uLnNjYWxlLFxuICAgICAgICBzdHJva2VDb2xvcjogYWdtSWNvbi5zdHJva2VDb2xvcixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogYWdtSWNvbi5zdHJva2VPcGFjaXR5LFxuICAgICAgICBzdHJva2VXZWlnaHQ6IGFnbUljb24uc3Ryb2tlV2VpZ2h0LFxuICAgICAgfSxcbiAgICB9IGFzIEljb25TZXF1ZW5jZSkpO1xuICAgIC8vIHBydW5lIHVuZGVmaW5lZHM7XG4gICAgaWNvbnMuZm9yRWFjaChpY29uID0+IHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGljb24pLmZvckVhY2goKFtrZXksIHZhbF0pID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZGVsZXRlIChpY29uIGFzIGFueSlba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGljb24uaWNvbi5hbmNob3IueCA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgdHlwZW9mIGljb24uaWNvbi5hbmNob3IueSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBkZWxldGUgaWNvbi5pY29uLmFuY2hvcjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpY29ucztcbiAgfVxuXG4gIGFkZFBvbHlsaW5lKGxpbmU6IEFnbVBvbHlsaW5lKSB7XG4gICAgY29uc3QgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKClcbiAgICAudGhlbigoKSA9PiBbIFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBvaW50cyhsaW5lKSxcbiAgICAgICAgICAgICAgICAgIFBvbHlsaW5lTWFuYWdlci5fY29udmVydEljb25zKGxpbmUpXSlcbiAgICAudGhlbigoW3BhdGgsIGljb25zXTogW0xhdExuZ0xpdGVyYWxbXSwgSWNvblNlcXVlbmNlW11dKSA9PlxuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlUG9seWxpbmUoe1xuICAgICAgICBjbGlja2FibGU6IGxpbmUuY2xpY2thYmxlLFxuICAgICAgICBkcmFnZ2FibGU6IGxpbmUuZHJhZ2dhYmxlLFxuICAgICAgICBlZGl0YWJsZTogbGluZS5lZGl0YWJsZSxcbiAgICAgICAgZ2VvZGVzaWM6IGxpbmUuZ2VvZGVzaWMsXG4gICAgICAgIHN0cm9rZUNvbG9yOiBsaW5lLnN0cm9rZUNvbG9yLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiBsaW5lLnN0cm9rZU9wYWNpdHksXG4gICAgICAgIHN0cm9rZVdlaWdodDogbGluZS5zdHJva2VXZWlnaHQsXG4gICAgICAgIHZpc2libGU6IGxpbmUudmlzaWJsZSxcbiAgICAgICAgekluZGV4OiBsaW5lLnpJbmRleCxcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgaWNvbnM6IGljb25zLFxuICAgIH0pKTtcbiAgICB0aGlzLl9wb2x5bGluZXMuc2V0KGxpbmUsIHBvbHlsaW5lUHJvbWlzZSk7XG4gIH1cblxuICB1cGRhdGVQb2x5bGluZVBvaW50cyhsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGggPSBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQb2ludHMobGluZSk7XG4gICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5bGluZSkgPT4geyByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4geyBsLnNldFBhdGgocGF0aCk7IH0pOyB9KTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUljb25TZXF1ZW5jZXMobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKTtcbiAgICBjb25zdCBpY29ucyA9IFBvbHlsaW5lTWFuYWdlci5fY29udmVydEljb25zKGxpbmUpO1xuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbihsID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IGwuc2V0T3B0aW9ucyh7aWNvbnM6IGljb25zfSkgKSApO1xuICB9XG5cbiAgc2V0UG9seWxpbmVPcHRpb25zKGxpbmU6IEFnbVBvbHlsaW5lLCBvcHRpb25zOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBhbnl9KTpcbiAgICAgIFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpLnRoZW4oKGw6IFBvbHlsaW5lKSA9PiB7IGwuc2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XG4gIH1cblxuICBkZWxldGVQb2x5bGluZShsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbigobDogUG9seWxpbmUpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIGwuc2V0TWFwKG51bGwpO1xuICAgICAgICB0aGlzLl9wb2x5bGluZXMuZGVsZXRlKGxpbmUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldE1WQ1BhdGgoYWdtUG9seWxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTxNVkNBcnJheTxMYXRMbmc+PiB7XG4gICAgY29uc3QgcG9seWxpbmUgPSBhd2FpdCB0aGlzLl9wb2x5bGluZXMuZ2V0KGFnbVBvbHlsaW5lKTtcbiAgICByZXR1cm4gcG9seWxpbmUuZ2V0UGF0aCgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0UGF0aChhZ21Qb2x5bGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPEFycmF5PExhdExuZz4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0TVZDUGF0aChhZ21Qb2x5bGluZSkpLmdldEFycmF5KCk7XG4gIH1cblxuICBjcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGxpbmU6IEFnbVBvbHlsaW5lKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgIHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSkudGhlbigobDogUG9seWxpbmUpID0+IHtcbiAgICAgICAgbC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVBhdGhFdmVudE9ic2VydmFibGUobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPE9ic2VydmFibGU8UGF0aEV2ZW50Pj4ge1xuICAgIGNvbnN0IG12Y1BhdGggPSBhd2FpdCB0aGlzLmdldE1WQ1BhdGgobGluZSk7XG4gICAgcmV0dXJuIGNyZWF0ZU1WQ0V2ZW50T2JzZXJ2YWJsZShtdmNQYXRoKTtcbiAgfVxufVxuIl19