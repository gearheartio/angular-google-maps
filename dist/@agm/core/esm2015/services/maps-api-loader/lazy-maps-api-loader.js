import { Inject, Injectable, InjectionToken, LOCALE_ID, Optional } from '@angular/core';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';
import { MapsAPILoader } from './maps-api-loader';
export var GoogleMapsScriptProtocol;
(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
export const LAZY_MAPS_API_CONFIG = new InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
export class LazyMapsAPILoader extends MapsAPILoader {
    constructor(config = null, w, d, localeId) {
        super();
        this.localeId = localeId;
        this._SCRIPT_ID = 'agmGoogleMapsApiScript';
        this.callbackName = `agmLazyMapsAPILoader`;
        this._config = config || {};
        this._windowRef = w;
        this._documentRef = d;
    }
    load() {
        const window = this._windowRef.getNativeWindow();
        if (window.google && window.google.maps) {
            // Google maps already loaded on the page.
            return Promise.resolve();
        }
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        // this can happen in HMR situations or Stackblitz.io editors.
        const scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
        if (scriptOnPage) {
            this._assignScriptLoadingPromise(scriptOnPage);
            return this._scriptLoadingPromise;
        }
        const script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.id = this._SCRIPT_ID;
        script.src = this._getScriptSrc(this.callbackName);
        this._assignScriptLoadingPromise(script);
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    }
    _assignScriptLoadingPromise(scriptElem) {
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            this._windowRef.getNativeWindow()[this.callbackName] = () => {
                resolve();
            };
            scriptElem.onerror = (error) => {
                reject(error);
            };
        });
    }
    _getScriptSrc(callbackName) {
        let protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        let protocol;
        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        const hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        const queryParams = {
            v: this._config.apiVersion || 'quarterly',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language || this.localeId !== 'en-US' ? this.localeId : null,
        };
        const params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            // join arrays as comma seperated strings
            let i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => {
            return `${entry.key}=${entry.value}`;
        })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
LazyMapsAPILoader.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LAZY_MAPS_API_CONFIG,] }] },
    { type: WindowRef },
    { type: DocumentRef },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
LazyMapsAPILoader.decorators = [
    { type: Injectable }
];
LazyMapsAPILoader.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LAZY_MAPS_API_CONFIG,] }] },
    { type: WindowRef },
    { type: DocumentRef },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1tYXBzLWFwaS1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsTUFBTSxDQUFOLElBQVksd0JBSVg7QUFKRCxXQUFZLHdCQUF3QjtJQUNsQyx1RUFBUSxDQUFBO0lBQ1IseUVBQVMsQ0FBQTtJQUNULHVFQUFRLENBQUE7QUFDVixDQUFDLEVBSlcsd0JBQXdCLEtBQXhCLHdCQUF3QixRQUluQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUFpQywwQ0FBMEMsQ0FBQyxDQUFDO0FBaUVuSSxNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTtJQVFsRCxZQUFzRCxTQUFjLElBQUksRUFBRSxDQUFZLEVBQUUsQ0FBYyxFQUMxRSxRQUFnQjtRQUMxQyxLQUFLLEVBQUUsQ0FBQztRQURrQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBSnpCLGVBQVUsR0FBVyx3QkFBd0IsQ0FBQztRQUM5QyxpQkFBWSxHQUFXLHNCQUFzQixDQUFDO1FBSy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFH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QUNELE9BQU8sRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxLQUFtQyxFQUFFLEVBQUU7WUFDM0MsT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsUUFBUSxLQUFLLFdBQVcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7NENBakdZLFFBQVEsWUFBSSxNQUFNLFNBQUMsb0JBQW9CO1lBQXlCLFNBQVM7WUFBSyxXQUFXO3lDQUNwRyxNQUFNLFNBQUMsU0FBUzs7O1lBVm5CLFVBQVU7Ozs0Q0FTSSxRQUFRLFlBQUksTUFBTSxTQUFDLG9CQUFvQjtZQXZGaEMsU0FBUztZQUF0QixXQUFXO3lDQXdGaEIsTUFBTSxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBMT0NBTEVfSUQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERvY3VtZW50UmVmLCBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi91dGlscy9icm93c2VyLWdsb2JhbHMnO1xuXG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXInO1xuXG5leHBvcnQgZW51bSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wge1xuICBIVFRQID0gMSxcbiAgSFRUUFMgPSAyLFxuICBBVVRPID0gMyxcbn1cblxuLyoqXG4gKiBUb2tlbiBmb3IgdGhlIGNvbmZpZyBvZiB0aGUgTGF6eU1hcHNBUElMb2FkZXIuIFBsZWFzZSBwcm92aWRlIGFuIG9iamVjdCBvZiB0eXBlIHtAbGlua1xuICogTGF6eU1hcHNBUElMb2FkZXJDb25maWd9LlxuICovXG5leHBvcnQgY29uc3QgTEFaWV9NQVBTX0FQSV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48TGF6eU1hcHNBUElMb2FkZXJDb25maWdMaXRlcmFsPignYW5ndWxhci1nb29nbGUtbWFwcyBMQVpZX01BUFNfQVBJX0NPTkZJRycpO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSB7QGxpbmsgTGF6eU1hcHNBUElMb2FkZXJ9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExhenlNYXBzQVBJTG9hZGVyQ29uZmlnTGl0ZXJhbCB7XG4gIC8qKlxuICAgKiBUaGUgR29vZ2xlIE1hcHMgQVBJIEtleSAoc2VlOlxuICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9nZXQtYXBpLWtleSlcbiAgICovXG4gIGFwaUtleT86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIEdvb2dsZSBNYXBzIGNsaWVudCBJRCAoZm9yIHByZW1pdW0gcGxhbnMpLlxuICAgKiBXaGVuIHlvdSBoYXZlIGEgR29vZ2xlIE1hcHMgQVBJcyBQcmVtaXVtIFBsYW4gbGljZW5zZSwgeW91IG11c3QgYXV0aGVudGljYXRlXG4gICAqIHlvdXIgYXBwbGljYXRpb24gd2l0aCBlaXRoZXIgYW4gQVBJIGtleSBvciBhIGNsaWVudCBJRC5cbiAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSB3aWxsIGZhaWwgdG8gbG9hZCBpZiBib3RoIGEgY2xpZW50IElEIGFuZCBhbiBBUEkga2V5IGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGNsaWVudElkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgR29vZ2xlIE1hcHMgY2hhbm5lbCBuYW1lIChmb3IgcHJlbWl1bSBwbGFucykuXG4gICAqIEEgY2hhbm5lbCBwYXJhbWV0ZXIgaXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgYWxsb3dzIHlvdSB0byB0cmFjayB1c2FnZSB1bmRlciB5b3VyIGNsaWVudFxuICAgKiBJRCBieSBhc3NpZ25pbmcgYSBkaXN0aW5jdCBjaGFubmVsIHRvIGVhY2ggb2YgeW91ciBhcHBsaWNhdGlvbnMuXG4gICAqL1xuICBjaGFubmVsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBHb29nbGUgTWFwcyBBUEkgdmVyc2lvbi5cbiAgICovXG4gIGFwaVZlcnNpb24/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEhvc3QgYW5kIFBhdGggdXNlZCBmb3IgdGhlIGA8c2NyaXB0PmAgdGFnLlxuICAgKi9cbiAgaG9zdEFuZFBhdGg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFByb3RvY29sIHVzZWQgZm9yIHRoZSBgPHNjcmlwdD5gIHRhZy5cbiAgICovXG4gIHByb3RvY29sPzogR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoaWNoIEdvb2dsZSBNYXBzIGxpYnJhcmllcyBzaG91bGQgZ2V0IGxvYWRlZC5cbiAgICovXG4gIGxpYnJhcmllcz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBiaWFzIGZvciB0aGUgbWFwIGJlaGF2aW9yIGlzIFVTLlxuICAgKiBJZiB5b3Ugd2lzaCB0byBhbHRlciB5b3VyIGFwcGxpY2F0aW9uIHRvIHNlcnZlIGRpZmZlcmVudCBtYXAgdGlsZXMgb3IgYmlhcyB0aGVcbiAgICogYXBwbGljYXRpb24sIHlvdSBjYW4gb3ZlcndyaXRlIHRoZSBkZWZhdWx0IGJlaGF2aW9yIChVUykgYnkgZGVmaW5pbmcgYSBgcmVnaW9uYC5cbiAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2Jhc2ljcyNSZWdpb25cbiAgICovXG4gIHJlZ2lvbj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSB1c2VzIHRoZSBicm93c2VyJ3MgcHJlZmVycmVkIGxhbmd1YWdlIHdoZW4gZGlzcGxheWluZ1xuICAgKiB0ZXh0dWFsIGluZm9ybWF0aW9uLiBJZiB5b3Ugd2lzaCB0byBvdmVyd3JpdGUgdGhpcyBiZWhhdmlvciBhbmQgZm9yY2UgdGhlIEFQSVxuICAgKiB0byB1c2UgYSBnaXZlbiBsYW5ndWFnZSwgeW91IGNhbiB1c2UgdGhpcyBzZXR0aW5nLlxuICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvYmFzaWNzI0xhbmd1YWdlXG4gICAqL1xuICBsYW5ndWFnZT86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExhenlNYXBzQVBJTG9hZGVyIGV4dGVuZHMgTWFwc0FQSUxvYWRlciB7XG4gIHByb3RlY3RlZCBfc2NyaXB0TG9hZGluZ1Byb21pc2U6IFByb21pc2U8dm9pZD47XG4gIHByb3RlY3RlZCBfY29uZmlnOiBMYXp5TWFwc0FQSUxvYWRlckNvbmZpZ0xpdGVyYWw7XG4gIHByb3RlY3RlZCBfd2luZG93UmVmOiBXaW5kb3dSZWY7XG4gIHByb3RlY3RlZCBfZG9jdW1lbnRSZWY6IERvY3VtZW50UmVmO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX1NDUklQVF9JRDogc3RyaW5nID0gJ2FnbUdvb2dsZU1hcHNBcGlTY3JpcHQnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2FsbGJhY2tOYW1lOiBzdHJpbmcgPSBgYWdtTGF6eU1hcHNBUElMb2FkZXJgO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTEFaWV9NQVBTX0FQSV9DT05GSUcpIGNvbmZpZzogYW55ID0gbnVsbCwgdzogV2luZG93UmVmLCBkOiBEb2N1bWVudFJlZixcbiAgIEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZUlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLl93aW5kb3dSZWYgPSB3O1xuICAgIHRoaXMuX2RvY3VtZW50UmVmID0gZDtcbiAgfVxuXG4gIGxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgd2luZG93ID0gdGhpcy5fd2luZG93UmVmLmdldE5hdGl2ZVdpbmRvdygpIGFzIGFueTtcbiAgICBpZiAod2luZG93Lmdvb2dsZSAmJiB3aW5kb3cuZ29vZ2xlLm1hcHMpIHtcbiAgICAgIC8vIEdvb2dsZSBtYXBzIGFscmVhZHkgbG9hZGVkIG9uIHRoZSBwYWdlLlxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgIH1cblxuICAgIC8vIHRoaXMgY2FuIGhhcHBlbiBpbiBITVIgc2l0dWF0aW9ucyBvciBTdGFja2JsaXR6LmlvIGVkaXRvcnMuXG4gICAgY29uc3Qgc2NyaXB0T25QYWdlID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0TmF0aXZlRG9jdW1lbnQoKS5nZXRFbGVtZW50QnlJZCh0aGlzLl9TQ1JJUFRfSUQpO1xuICAgIGlmIChzY3JpcHRPblBhZ2UpIHtcbiAgICAgIHRoaXMuX2Fzc2lnblNjcmlwdExvYWRpbmdQcm9taXNlKHNjcmlwdE9uUGFnZSk7XG4gICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICBzY3JpcHQuaWQgPSB0aGlzLl9TQ1JJUFRfSUQ7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuX2dldFNjcmlwdFNyYyh0aGlzLmNhbGxiYWNrTmFtZSk7XG4gICAgdGhpcy5fYXNzaWduU2NyaXB0TG9hZGluZ1Byb21pc2Uoc2NyaXB0KTtcbiAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXROYXRpdmVEb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XG4gIH1cblxuICBwcml2YXRlIF9hc3NpZ25TY3JpcHRMb2FkaW5nUHJvbWlzZShzY3JpcHRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAodGhpcy5fd2luZG93UmVmLmdldE5hdGl2ZVdpbmRvdygpIGFzIGFueSlbdGhpcy5jYWxsYmFja05hbWVdID0gKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuXG4gICAgICBzY3JpcHRFbGVtLm9uZXJyb3IgPSAoZXJyb3I6IEV2ZW50KSA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRTY3JpcHRTcmMoY2FsbGJhY2tOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBwcm90b2NvbFR5cGU6IEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbCA9XG4gICAgICAgICh0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLnByb3RvY29sKSB8fCBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUFM7XG4gICAgbGV0IHByb3RvY29sOiBzdHJpbmc7XG5cbiAgICBzd2l0Y2ggKHByb3RvY29sVHlwZSkge1xuICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuQVVUTzpcbiAgICAgICAgcHJvdG9jb2wgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbC5IVFRQOlxuICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUFM6XG4gICAgICAgIHByb3RvY29sID0gJ2h0dHBzOic7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGhvc3RBbmRQYXRoOiBzdHJpbmcgPSB0aGlzLl9jb25maWcuaG9zdEFuZFBhdGggfHwgJ21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPn0gPSB7XG4gICAgICB2OiB0aGlzLl9jb25maWcuYXBpVmVyc2lvbiB8fCAncXVhcnRlcmx5JyxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja05hbWUsXG4gICAgICBrZXk6IHRoaXMuX2NvbmZpZy5hcGlLZXksXG4gICAgICBjbGllbnQ6IHRoaXMuX2NvbmZpZy5jbGllbnRJZCxcbiAgICAgIGNoYW5uZWw6IHRoaXMuX2NvbmZpZy5jaGFubmVsLFxuICAgICAgbGlicmFyaWVzOiB0aGlzLl9jb25maWcubGlicmFyaWVzLFxuICAgICAgcmVnaW9uOiB0aGlzLl9jb25maWcucmVnaW9uLFxuICAgICAgbGFuZ3VhZ2U6IHRoaXMuX2NvbmZpZy5sYW5ndWFnZSB8fCB0aGlzLmxvY2FsZUlkICE9PSAnZW4tVVMnID8gdGhpcy5sb2NhbGVJZCA6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCBwYXJhbXM6IHN0cmluZyA9IE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGs6IHN0cmluZykgPT4gcXVlcnlQYXJhbXNba10gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChrOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlbXB0eSBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgJiYgcXVlcnlQYXJhbXNba10ubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChrOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGpvaW4gYXJyYXlzIGFzIGNvbW1hIHNlcGVyYXRlZCBzdHJpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IHF1ZXJ5UGFyYW1zW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtrZXk6IGssIHZhbHVlOiBpLmpvaW4oJywnKX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2tleTogaywgdmFsdWU6IHF1ZXJ5UGFyYW1zW2tdfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGVudHJ5OiB7a2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZW50cnkua2V5fT0ke2VudHJ5LnZhbHVlfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuam9pbignJicpO1xuICAgIHJldHVybiBgJHtwcm90b2NvbH0vLyR7aG9zdEFuZFBhdGh9PyR7cGFyYW1zfWA7XG4gIH1cbn1cbiJdfQ==