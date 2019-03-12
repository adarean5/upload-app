'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">upload-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-28104a574aca13e840d0c998308f7f80"' : 'data-target="#xs-components-links-module-AppModule-28104a574aca13e840d0c998308f7f80"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-28104a574aca13e840d0c998308f7f80"' :
                                            'id="xs-components-links-module-AppModule-28104a574aca13e840d0c998308f7f80"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-ffd90eeea378b7eaa15bbf514d8086f0"' : 'data-target="#xs-components-links-module-AuthModule-ffd90eeea378b7eaa15bbf514d8086f0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-ffd90eeea378b7eaa15bbf514d8086f0"' :
                                            'id="xs-components-links-module-AuthModule-ffd90eeea378b7eaa15bbf514d8086f0"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link">UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' : 'data-target="#xs-components-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' :
                                            'id="xs-components-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' }>
                                            <li class="link">
                                                <a href="components/FileTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadDialogueComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadDialogueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadMainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' : 'data-target="#xs-injectables-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' :
                                        'id="xs-injectables-links-module-UploadModule-959cd2b91018530d4a7607c3cb5a6ed2"' }>
                                        <li class="link">
                                            <a href="injectables/UploadFilesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UploadFilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsModule.html" data-type="entity-link">WidgetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-WidgetsModule-bc9306368498a316744f7db1d5993b06"' : 'data-target="#xs-pipes-links-module-WidgetsModule-bc9306368498a316744f7db1d5993b06"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-WidgetsModule-bc9306368498a316744f7db1d5993b06"' :
                                            'id="xs-pipes-links-module-WidgetsModule-bc9306368498a316744f7db1d5993b06"' }>
                                            <li class="link">
                                                <a href="pipes/FileSizePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileSizePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteFailure.html" data-type="entity-link">DeleteFailure</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteStart.html" data-type="entity-link">DeleteStart</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteSuccess.html" data-type="entity-link">DeleteSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadFailure.html" data-type="entity-link">DownloadFailure</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadStart.html" data-type="entity-link">DownloadStart</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadSuccess.html" data-type="entity-link">DownloadSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileInfo.html" data-type="entity-link">FileInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetFilesInfo.html" data-type="entity-link">GetFilesInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetFilesInfoSuccess.html" data-type="entity-link">GetFilesInfoSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadFailure.html" data-type="entity-link">UploadFailure</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadStart.html" data-type="entity-link">UploadStart</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadSuccess.html" data-type="entity-link">UploadSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadUpdate.html" data-type="entity-link">UploadUpdate</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/UploadEffects.html" data-type="entity-link">UploadEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadFilesService.html" data-type="entity-link">UploadFilesService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link">AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link">DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadState.html" data-type="entity-link">UploadState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});