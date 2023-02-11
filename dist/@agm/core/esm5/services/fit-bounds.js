import { Injectable } from '@angular/core';
import { BehaviorSubject, from, timer } from 'rxjs';
import { flatMap, map, sample, shareReplay, switchMap, } from 'rxjs/operators';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 */
var FitBoundsAccessor = /** @class */ (function () {
    function FitBoundsAccessor() {
    }
    return FitBoundsAccessor;
}());
export { FitBoundsAccessor };
/**
 * The FitBoundsService is responsible for computing the bounds of the a single map.
 */
var FitBoundsService = /** @class */ (function () {
    function FitBoundsService(loader) {
        var _this = this;
        this._boundsChangeSampleTime$ = new BehaviorSubject(200);
        this._includeInBounds$ = new BehaviorSubject(new Map());
        this.bounds$ = from(loader.load()).pipe(flatMap(function () { return _this._includeInBounds$; }), sample(this._boundsChangeSampleTime$.pipe(switchMap(function (time) { return timer(0, time); }))), map(function (includeInBounds) { return _this._generateBounds(includeInBounds); }), shareReplay(1));
    }
    FitBoundsService.prototype._generateBounds = function (includeInBounds) {
        var bounds = new google.maps.LatLngBounds();
        includeInBounds.forEach(function (b) { return bounds.extend(b); });
        return bounds;
    };
    FitBoundsService.prototype.addToBounds = function (latLng) {
        var id = this._createIdentifier(latLng);
        if (this._includeInBounds$.value.has(id)) {
            return;
        }
        var map = this._includeInBounds$.value;
        map.set(id, latLng);
        this._includeInBounds$.next(map);
    };
    FitBoundsService.prototype.removeFromBounds = function (latLng) {
        var map = this._includeInBounds$.value;
        map.delete(this._createIdentifier(latLng));
        this._includeInBounds$.next(map);
    };
    FitBoundsService.prototype.changeFitBoundsChangeSampleTime = function (timeMs) {
        this._boundsChangeSampleTime$.next(timeMs);
    };
    FitBoundsService.prototype.getBounds$ = function () {
        return this.bounds$;
    };
    FitBoundsService.prototype._createIdentifier = function (latLng) {
        return latLng.lat + "+" + latLng.lng;
    };
    FitBoundsService.ctorParameters = function () { return [
        { type: MapsAPILoader }
    ]; };
    FitBoundsService.decorators = [
        { type: Injectable }
    ];
    FitBoundsService.ctorParameters = function () { return [
        { type: MapsAPILoader }
    ]; };
    return FitBoundsService;
}());
export { FitBoundsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZpdC1ib3VuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUNMLE9BQU8sRUFDUCxHQUFHLEVBQ0gsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFhbEU7OztHQUdHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUVEOztHQUVHO0FBQ0g7SUFNRSwwQkFBWSxNQUFxQjtRQUFqQyxpQkFTQztRQVprQiw2QkFBd0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxHQUFHLENBQUMsQ0FBQztRQUM1RCxzQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBWSxJQUFJLEdBQUcsRUFBa0MsQ0FBQyxDQUFDO1FBRy9HLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDckMsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsaUJBQWlCLEVBQXRCLENBQXNCLENBQUMsRUFDckMsTUFBTSxDQUNKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBZCxDQUFjLENBQUMsQ0FBQyxDQUN0RSxFQUNELEdBQUcsQ0FBQyxVQUFBLGVBQWUsSUFBSSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQXJDLENBQXFDLENBQUMsRUFDN0QsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7SUFDSixDQUFDO0lBRU8sMENBQWUsR0FBdkIsVUFDRSxlQUFvRDtRQUVwRCxJQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFrQixDQUFDO1FBQzlELGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDL0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHNDQUFXLEdBQVgsVUFBWSxNQUE4QjtRQUN4QyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFDRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDJDQUFnQixHQUFoQixVQUFpQixNQUE4QjtRQUM3QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMERBQStCLEdBQS9CLFVBQWdDLE1BQWM7UUFDNUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQscUNBQVUsR0FBVjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRVMsNENBQWlCLEdBQTNCLFVBQTRCLE1BQThCO1FBQ3hELE9BQVUsTUFBTSxDQUFDLEdBQUcsU0FBSSxNQUFNLENBQUMsR0FBSyxDQUFDO0lBQ3ZDLENBQUM7O2dCQTdDbUIsYUFBYTs7O2dCQU5sQyxVQUFVOzs7Z0JBeEJGLGFBQWE7O0lBNEV0Qix1QkFBQztDQUFBLEFBcERELElBb0RDO1NBbkRZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgZnJvbSwgT2JzZXJ2YWJsZSwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGZsYXRNYXAsXG4gIG1hcCxcbiAgc2FtcGxlLFxuICBzaGFyZVJlcGxheSxcbiAgc3dpdGNoTWFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXRMbmcsIExhdExuZ0JvdW5kcywgTGF0TG5nTGl0ZXJhbCB9IGZyb20gJy4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlcic7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpdEJvdW5kc0RldGFpbHMge1xuICBsYXRMbmc6IExhdExuZyB8IExhdExuZ0xpdGVyYWw7XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCB0eXBlIEJvdW5kc01hcCA9IE1hcDxzdHJpbmcsIExhdExuZyB8IExhdExuZ0xpdGVyYWw+O1xuXG4vKipcbiAqIENsYXNzIHRvIGltcGxlbWVudCB3aGVuIHlvdSB3aGF0IHRvIGJlIGFibGUgdG8gbWFrZSBpdCB3b3JrIHdpdGggdGhlIGF1dG8gZml0IGJvdW5kcyBmZWF0dXJlXG4gKiBvZiBBR00uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaXRCb3VuZHNBY2Nlc3NvciB7XG4gIGFic3RyYWN0IGdldEZpdEJvdW5kc0RldGFpbHMkKCk6IE9ic2VydmFibGU8Rml0Qm91bmRzRGV0YWlscz47XG59XG5cbi8qKlxuICogVGhlIEZpdEJvdW5kc1NlcnZpY2UgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGluZyB0aGUgYm91bmRzIG9mIHRoZSBhIHNpbmdsZSBtYXAuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaXRCb3VuZHNTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJvdW5kcyQ6IE9ic2VydmFibGU8TGF0TG5nQm91bmRzPjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9ib3VuZHNDaGFuZ2VTYW1wbGVUaW1lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigyMDApO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luY2x1ZGVJbkJvdW5kcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJvdW5kc01hcD4obmV3IE1hcDxzdHJpbmcsIExhdExuZyB8IExhdExuZ0xpdGVyYWw+KCkpO1xuXG4gIGNvbnN0cnVjdG9yKGxvYWRlcjogTWFwc0FQSUxvYWRlcikge1xuICAgIHRoaXMuYm91bmRzJCA9IGZyb20obG9hZGVyLmxvYWQoKSkucGlwZShcbiAgICAgIGZsYXRNYXAoKCkgPT4gdGhpcy5faW5jbHVkZUluQm91bmRzJCksXG4gICAgICBzYW1wbGUoXG4gICAgICAgIHRoaXMuX2JvdW5kc0NoYW5nZVNhbXBsZVRpbWUkLnBpcGUoc3dpdGNoTWFwKHRpbWUgPT4gdGltZXIoMCwgdGltZSkpKSxcbiAgICAgICksXG4gICAgICBtYXAoaW5jbHVkZUluQm91bmRzID0+IHRoaXMuX2dlbmVyYXRlQm91bmRzKGluY2x1ZGVJbkJvdW5kcykpLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlQm91bmRzKFxuICAgIGluY2x1ZGVJbkJvdW5kczogTWFwPHN0cmluZywgTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbD4sXG4gICkge1xuICAgIGNvbnN0IGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKSBhcyBMYXRMbmdCb3VuZHM7XG4gICAgaW5jbHVkZUluQm91bmRzLmZvckVhY2goYiA9PiBib3VuZHMuZXh0ZW5kKGIpKTtcbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgYWRkVG9Cb3VuZHMobGF0TG5nOiBMYXRMbmcgfCBMYXRMbmdMaXRlcmFsKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLl9jcmVhdGVJZGVudGlmaWVyKGxhdExuZyk7XG4gICAgaWYgKHRoaXMuX2luY2x1ZGVJbkJvdW5kcyQudmFsdWUuaGFzKGlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtYXAgPSB0aGlzLl9pbmNsdWRlSW5Cb3VuZHMkLnZhbHVlO1xuICAgIG1hcC5zZXQoaWQsIGxhdExuZyk7XG4gICAgdGhpcy5faW5jbHVkZUluQm91bmRzJC5uZXh0KG1hcCk7XG4gIH1cblxuICByZW1vdmVGcm9tQm91bmRzKGxhdExuZzogTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMuX2luY2x1ZGVJbkJvdW5kcyQudmFsdWU7XG4gICAgbWFwLmRlbGV0ZSh0aGlzLl9jcmVhdGVJZGVudGlmaWVyKGxhdExuZykpO1xuICAgIHRoaXMuX2luY2x1ZGVJbkJvdW5kcyQubmV4dChtYXApO1xuICB9XG5cbiAgY2hhbmdlRml0Qm91bmRzQ2hhbmdlU2FtcGxlVGltZSh0aW1lTXM6IG51bWJlcikge1xuICAgIHRoaXMuX2JvdW5kc0NoYW5nZVNhbXBsZVRpbWUkLm5leHQodGltZU1zKTtcbiAgfVxuXG4gIGdldEJvdW5kcyQoKTogT2JzZXJ2YWJsZTxMYXRMbmdCb3VuZHM+IHtcbiAgICByZXR1cm4gdGhpcy5ib3VuZHMkO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVJZGVudGlmaWVyKGxhdExuZzogTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2xhdExuZy5sYXR9KyR7bGF0TG5nLmxuZ31gO1xuICB9XG59XG4iXX0=