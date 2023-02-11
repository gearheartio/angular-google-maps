import { Injectable } from '@angular/core';
import { BehaviorSubject, from, timer } from 'rxjs';
import { flatMap, map, sample, shareReplay, switchMap, } from 'rxjs/operators';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 */
export class FitBoundsAccessor {
}
/**
 * The FitBoundsService is responsible for computing the bounds of the a single map.
 */
export class FitBoundsService {
    constructor(loader) {
        this._boundsChangeSampleTime$ = new BehaviorSubject(200);
        this._includeInBounds$ = new BehaviorSubject(new Map());
        this.bounds$ = from(loader.load()).pipe(flatMap(() => this._includeInBounds$), sample(this._boundsChangeSampleTime$.pipe(switchMap(time => timer(0, time)))), map(includeInBounds => this._generateBounds(includeInBounds)), shareReplay(1));
    }
    _generateBounds(includeInBounds) {
        const bounds = new google.maps.LatLngBounds();
        includeInBounds.forEach(b => bounds.extend(b));
        return bounds;
    }
    addToBounds(latLng) {
        const id = this._createIdentifier(latLng);
        if (this._includeInBounds$.value.has(id)) {
            return;
        }
        const map = this._includeInBounds$.value;
        map.set(id, latLng);
        this._includeInBounds$.next(map);
    }
    removeFromBounds(latLng) {
        const map = this._includeInBounds$.value;
        map.delete(this._createIdentifier(latLng));
        this._includeInBounds$.next(map);
    }
    changeFitBoundsChangeSampleTime(timeMs) {
        this._boundsChangeSampleTime$.next(timeMs);
    }
    getBounds$() {
        return this.bounds$;
    }
    _createIdentifier(latLng) {
        return `${latLng.lat}+${latLng.lng}`;
    }
}
FitBoundsService.ctorParameters = () => [
    { type: MapsAPILoader }
];
FitBoundsService.decorators = [
    { type: Injectable }
];
FitBoundsService.ctorParameters = () => [
    { type: MapsAPILoader }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZpdC1ib3VuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUNMLE9BQU8sRUFDUCxHQUFHLEVBQ0gsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFhbEU7OztHQUdHO0FBQ0gsTUFBTSxPQUFnQixpQkFBaUI7Q0FFdEM7QUFFRDs7R0FFRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFLM0IsWUFBWSxNQUFxQjtRQUhkLDZCQUF3QixHQUFHLElBQUksZUFBZSxDQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzVELHNCQUFpQixHQUFHLElBQUksZUFBZSxDQUFZLElBQUksR0FBRyxFQUFrQyxDQUFDLENBQUM7UUFHL0csSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNyQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQ3JDLE1BQU0sQ0FDSixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUN0RSxFQUNELEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsRUFDN0QsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7SUFDSixDQUFDO0lBRU8sZUFBZSxDQUNyQixlQUFvRDtRQUVwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFrQixDQUFDO1FBQzlELGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUE4QjtRQUN4QyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQThCO1FBQzdDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCwrQkFBK0IsQ0FBQyxNQUFjO1FBQzVDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVTLGlCQUFpQixDQUFDLE1BQThCO1FBQ3hELE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7WUE3Q21CLGFBQWE7OztZQU5sQyxVQUFVOzs7WUF4QkYsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgZnJvbSwgT2JzZXJ2YWJsZSwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGZsYXRNYXAsXG4gIG1hcCxcbiAgc2FtcGxlLFxuICBzaGFyZVJlcGxheSxcbiAgc3dpdGNoTWFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXRMbmcsIExhdExuZ0JvdW5kcywgTGF0TG5nTGl0ZXJhbCB9IGZyb20gJy4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlcic7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpdEJvdW5kc0RldGFpbHMge1xuICBsYXRMbmc6IExhdExuZyB8IExhdExuZ0xpdGVyYWw7XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCB0eXBlIEJvdW5kc01hcCA9IE1hcDxzdHJpbmcsIExhdExuZyB8IExhdExuZ0xpdGVyYWw+O1xuXG4vKipcbiAqIENsYXNzIHRvIGltcGxlbWVudCB3aGVuIHlvdSB3aGF0IHRvIGJlIGFibGUgdG8gbWFrZSBpdCB3b3JrIHdpdGggdGhlIGF1dG8gZml0IGJvdW5kcyBmZWF0dXJlXG4gKiBvZiBBR00uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaXRCb3VuZHNBY2Nlc3NvciB7XG4gIGFic3RyYWN0IGdldEZpdEJvdW5kc0RldGFpbHMkKCk6IE9ic2VydmFibGU8Rml0Qm91bmRzRGV0YWlscz47XG59XG5cbi8qKlxuICogVGhlIEZpdEJvdW5kc1NlcnZpY2UgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGluZyB0aGUgYm91bmRzIG9mIHRoZSBhIHNpbmdsZSBtYXAuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaXRCb3VuZHNTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJvdW5kcyQ6IE9ic2VydmFibGU8TGF0TG5nQm91bmRzPjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9ib3VuZHNDaGFuZ2VTYW1wbGVUaW1lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigyMDApO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luY2x1ZGVJbkJvdW5kcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJvdW5kc01hcD4obmV3IE1hcDxzdHJpbmcsIExhdExuZyB8IExhdExuZ0xpdGVyYWw+KCkpO1xuXG4gIGNvbnN0cnVjdG9yKGxvYWRlcjogTWFwc0FQSUxvYWRlcikge1xuICAgIHRoaXMuYm91bmRzJCA9IGZyb20obG9hZGVyLmxvYWQoKSkucGlwZShcbiAgICAgIGZsYXRNYXAoKCkgPT4gdGhpcy5faW5jbHVkZUluQm91bmRzJCksXG4gICAgICBzYW1wbGUoXG4gICAgICAgIHRoaXMuX2JvdW5kc0NoYW5nZVNhbXBsZVRpbWUkLnBpcGUoc3dpdGNoTWFwKHRpbWUgPT4gdGltZXIoMCwgdGltZSkpKSxcbiAgICAgICksXG4gICAgICBtYXAoaW5jbHVkZUluQm91bmRzID0+IHRoaXMuX2dlbmVyYXRlQm91bmRzKGluY2x1ZGVJbkJvdW5kcykpLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlQm91bmRzKFxuICAgIGluY2x1ZGVJbkJvdW5kczogTWFwPHN0cmluZywgTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbD4sXG4gICkge1xuICAgIGNvbnN0IGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKSBhcyBMYXRMbmdCb3VuZHM7XG4gICAgaW5jbHVkZUluQm91bmRzLmZvckVhY2goYiA9PiBib3VuZHMuZXh0ZW5kKGIpKTtcbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgYWRkVG9Cb3VuZHMobGF0TG5nOiBMYXRMbmcgfCBMYXRMbmdMaXRlcmFsKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLl9jcmVhdGVJZGVudGlmaWVyKGxhdExuZyk7XG4gICAgaWYgKHRoaXMuX2luY2x1ZGVJbkJvdW5kcyQudmFsdWUuaGFzKGlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtYXAgPSB0aGlzLl9pbmNsdWRlSW5Cb3VuZHMkLnZhbHVlO1xuICAgIG1hcC5zZXQoaWQsIGxhdExuZyk7XG4gICAgdGhpcy5faW5jbHVkZUluQm91bmRzJC5uZXh0KG1hcCk7XG4gIH1cblxuICByZW1vdmVGcm9tQm91bmRzKGxhdExuZzogTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMuX2luY2x1ZGVJbkJvdW5kcyQudmFsdWU7XG4gICAgbWFwLmRlbGV0ZSh0aGlzLl9jcmVhdGVJZGVudGlmaWVyKGxhdExuZykpO1xuICAgIHRoaXMuX2luY2x1ZGVJbkJvdW5kcyQubmV4dChtYXApO1xuICB9XG5cbiAgY2hhbmdlRml0Qm91bmRzQ2hhbmdlU2FtcGxlVGltZSh0aW1lTXM6IG51bWJlcikge1xuICAgIHRoaXMuX2JvdW5kc0NoYW5nZVNhbXBsZVRpbWUkLm5leHQodGltZU1zKTtcbiAgfVxuXG4gIGdldEJvdW5kcyQoKTogT2JzZXJ2YWJsZTxMYXRMbmdCb3VuZHM+IHtcbiAgICByZXR1cm4gdGhpcy5ib3VuZHMkO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVJZGVudGlmaWVyKGxhdExuZzogTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2xhdExuZy5sYXR9KyR7bGF0TG5nLmxuZ31gO1xuICB9XG59XG4iXX0=