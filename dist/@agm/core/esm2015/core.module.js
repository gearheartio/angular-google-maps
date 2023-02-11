import { NgModule } from '@angular/core';
import { AgmBicyclingLayer } from './directives/bicycling-layer';
import { AgmCircle } from './directives/circle';
import { AgmDataLayer } from './directives/data-layer';
import { AgmFitBounds } from './directives/fit-bounds';
import { AgmInfoWindow } from './directives/info-window';
import { AgmKmlLayer } from './directives/kml-layer';
import { AgmMap } from './directives/map';
import { AgmMarker } from './directives/marker';
import { AgmPolygon } from './directives/polygon';
import { AgmPolyline } from './directives/polyline';
import { AgmPolylineIcon } from './directives/polyline-icon';
import { AgmPolylinePoint } from './directives/polyline-point';
import { AgmRectangle } from './directives/rectangle';
import { AgmTransitLayer } from './directives/transit-layer';
import { LAZY_MAPS_API_CONFIG, LazyMapsAPILoader } from './services/maps-api-loader/lazy-maps-api-loader';
import { MapsAPILoader } from './services/maps-api-loader/maps-api-loader';
import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';
/**
 * @internal
 */
export function coreDirectives() {
    return [
        AgmBicyclingLayer,
        AgmCircle,
        AgmDataLayer,
        AgmFitBounds,
        AgmInfoWindow,
        AgmKmlLayer,
        AgmMap,
        AgmMarker,
        AgmPolygon,
        AgmPolyline,
        AgmPolylineIcon,
        AgmPolylinePoint,
        AgmRectangle,
        AgmTransitLayer,
    ];
}
/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
export class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: [
                ...BROWSER_GLOBALS_PROVIDERS, { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig },
            ],
        };
    }
}
AgmCoreModule.decorators = [
    { type: NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQWtDLE1BQU0saURBQWlELENBQUM7QUFDMUksT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRTNFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGNBQWM7SUFDNUIsT0FBTztRQUNMLGlCQUFpQjtRQUNqQixTQUFTO1FBQ1QsWUFBWTtRQUNaLFlBQVk7UUFDWixhQUFhO1FBQ2IsV0FBVztRQUNYLE1BQU07UUFDTixTQUFTO1FBQ1QsVUFBVTtRQUNWLFdBQVc7UUFDWCxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixlQUFlO0tBQ2hCLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGFBQWE7SUFDeEI7O09BRUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLHVCQUF3RDtRQUNyRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNULEdBQUcseUJBQXlCLEVBQUUsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQztnQkFDbkYsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDO2FBQ25FO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWJGLFFBQVEsU0FBQyxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBZ21CaWN5Y2xpbmdMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXInO1xuaW1wb3J0IHsgQWdtQ2lyY2xlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NpcmNsZSc7XG5pbXBvcnQgeyBBZ21EYXRhTGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGF0YS1sYXllcic7XG5pbXBvcnQgeyBBZ21GaXRCb3VuZHMgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZml0LWJvdW5kcyc7XG5pbXBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi9kaXJlY3RpdmVzL2luZm8td2luZG93JztcbmltcG9ydCB7IEFnbUttbExheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ttbC1sYXllcic7XG5pbXBvcnQgeyBBZ21NYXAgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFwJztcbmltcG9ydCB7IEFnbU1hcmtlciB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXJrZXInO1xuaW1wb3J0IHsgQWdtUG9seWdvbiB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5Z29uJztcbmltcG9ydCB7IEFnbVBvbHlsaW5lIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lJztcbmltcG9ydCB7IEFnbVBvbHlsaW5lSWNvbiB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZS1pY29uJztcbmltcG9ydCB7IEFnbVBvbHlsaW5lUG9pbnQgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQnO1xuaW1wb3J0IHsgQWdtUmVjdGFuZ2xlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlY3RhbmdsZSc7XG5pbXBvcnQgeyBBZ21UcmFuc2l0TGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJhbnNpdC1sYXllcic7XG5cbmltcG9ydCB7IExBWllfTUFQU19BUElfQ09ORklHLCBMYXp5TWFwc0FQSUxvYWRlciwgTGF6eU1hcHNBUElMb2FkZXJDb25maWdMaXRlcmFsIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXInO1xuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlcic7XG5cbmltcG9ydCB7IEJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMgfSBmcm9tICcuL3V0aWxzL2Jyb3dzZXItZ2xvYmFscyc7XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3JlRGlyZWN0aXZlcygpIHtcbiAgcmV0dXJuIFtcbiAgICBBZ21CaWN5Y2xpbmdMYXllcixcbiAgICBBZ21DaXJjbGUsXG4gICAgQWdtRGF0YUxheWVyLFxuICAgIEFnbUZpdEJvdW5kcyxcbiAgICBBZ21JbmZvV2luZG93LFxuICAgIEFnbUttbExheWVyLFxuICAgIEFnbU1hcCxcbiAgICBBZ21NYXJrZXIsXG4gICAgQWdtUG9seWdvbixcbiAgICBBZ21Qb2x5bGluZSxcbiAgICBBZ21Qb2x5bGluZUljb24sXG4gICAgQWdtUG9seWxpbmVQb2ludCxcbiAgICBBZ21SZWN0YW5nbGUsXG4gICAgQWdtVHJhbnNpdExheWVyLFxuICBdO1xufVxuXG4vKipcbiAqIFRoZSBhbmd1bGFyLWdvb2dsZS1tYXBzIGNvcmUgbW9kdWxlLiBDb250YWlucyBhbGwgRGlyZWN0aXZlcy9TZXJ2aWNlcy9QaXBlc1xuICogb2YgdGhlIGNvcmUgbW9kdWxlLiBQbGVhc2UgdXNlIGBBZ21Db3JlTW9kdWxlLmZvclJvb3QoKWAgaW4geW91ciBhcHAgbW9kdWxlLlxuICovXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogY29yZURpcmVjdGl2ZXMoKSwgZXhwb3J0czogY29yZURpcmVjdGl2ZXMoKX0pXG5leHBvcnQgY2xhc3MgQWdtQ29yZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBQbGVhc2UgdXNlIHRoaXMgbWV0aG9kIHdoZW4geW91IHJlZ2lzdGVyIHRoZSBtb2R1bGUgYXQgdGhlIHJvb3QgbGV2ZWwuXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChsYXp5TWFwc0FQSUxvYWRlckNvbmZpZz86IExhenlNYXBzQVBJTG9hZGVyQ29uZmlnTGl0ZXJhbCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWdtQ29yZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQWdtQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5CUk9XU0VSX0dMT0JBTFNfUFJPVklERVJTLCB7cHJvdmlkZTogTWFwc0FQSUxvYWRlciwgdXNlQ2xhc3M6IExhenlNYXBzQVBJTG9hZGVyfSxcbiAgICAgICAge3Byb3ZpZGU6IExBWllfTUFQU19BUElfQ09ORklHLCB1c2VWYWx1ZTogbGF6eU1hcHNBUElMb2FkZXJDb25maWd9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=