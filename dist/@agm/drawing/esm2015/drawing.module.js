import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AgmDrawingManager } from './directives/drawing-manager';
import { AgmDrawingManagerTrigger } from './directives/drawing-manager-trigger';
export class AgmDrawingModule {
}
AgmDrawingModule.decorators = [
    { type: NgModule, args: [{
                imports: [AgmCoreModule],
                declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
                exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2RyYXdpbmcvIiwic291cmNlcyI6WyJkcmF3aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFPaEYsTUFBTSxPQUFPLGdCQUFnQjs7O1lBTDVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDO2dCQUMzRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQzthQUN2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFnbURyYXdpbmdNYW5hZ2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RyYXdpbmctbWFuYWdlcic7XG5pbXBvcnQgeyBBZ21EcmF3aW5nTWFuYWdlclRyaWdnZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHJhd2luZy1tYW5hZ2VyLXRyaWdnZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQWdtQ29yZU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0FnbURyYXdpbmdNYW5hZ2VyLCBBZ21EcmF3aW5nTWFuYWdlclRyaWdnZXJdLFxuICBleHBvcnRzOiBbQWdtRHJhd2luZ01hbmFnZXIsIEFnbURyYXdpbmdNYW5hZ2VyVHJpZ2dlcl0sXG59KVxuZXhwb3J0IGNsYXNzIEFnbURyYXdpbmdNb2R1bGUge1xufVxuIl19