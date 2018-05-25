    localStorage.v = 1;
    localStorage.t = 'test';
    localStorage.p = 123;

    // Размеры [120, 100, 80] x [*] x [8, 5] от 1 до 9 шт.
    var skn0 = "10%"
    // Нестандарты от 5 до 9 шт
    var skn1 = "10%"
    // Нестандарты от 2 до 4 шт
    var skn2 = "20%"
    // Нестандарты поштучно
    var skn3 = "35%"
    // Нестандарты от 0.5 м3 или от 10 шт
    var skn4 = " ***"


    function _a(t, e) {
        {
            var s = new XMLHttpRequest;
            Date.now()
        }
        s.open(t.method || "POST", t.url, !0),
        s.timeout = t.timeout || 3e4,
        s.onload = function() {
            e(s.status >= 200 && s.status < 300 ? {
                result: 1,
                response: s.responseText
            } : {
                result: 0,
                response: s.responseText,
                status: s.status,
                statusText: s.statusText
            })
        }
        ,
        s.onerror = function() {
            e({
                result: 0,
                response: s.responseText,
                status: s.status,
                statusText: s.statusText
            })
        }
        ,
        t.headers && Object.keys(t.headers).forEach(function(e) {
            s.setRequestHeader(e, t.headers[e])
        });
        var a = t.data && "object" == typeof t.data ? JSON.stringify(t.data) : t.data;
        s.send(a)
    }
    !function(e, t, i) {
        "use strict";
        "function" == typeof define && define.amd ? define(i) : "undefined" != typeof module && module.exports ? module.exports = i() : t.exports ? t.exports = i() : t[e] = i()
    }("Fingerprint2", this, function() {
        "use strict";
        var e = function(t) {
            if (!(this instanceof e))
                return new e(t);
            var i = {
                swfContainerId: "fingerprintjs2",
                detectScreenOrientation: !0,
                sortPluginsFor: [/palemoon/i],
                userDefinedFonts: []
            };
            this.options = this.extend(t, i),
            this.nativeForEach = Array.prototype.forEach,
            this.nativeMap = Array.prototype.map
        };
        return e.prototype = {
            extend: function(e, t) {
                if (null == e)
                    return t;
                for (var i in e)
                    null != e[i] && t[i] !== e[i] && (t[i] = e[i]);
                return t
            },
            get: function(e) {
                var t = [];
                t = this.userAgentKey(t),
                t = this.languageKey(t),
                t = this.colorDepthKey(t),
                t = this.pixelRatioKey(t),
                t = this.hardwareConcurrencyKey(t),
                t = this.screenResolutionKey(t),
                t = this.availableScreenResolutionKey(t),
                t = this.timezoneOffsetKey(t),
                t = this.sessionStorageKey(t),
                t = this.localStorageKey(t),
                t = this.indexedDbKey(t),
                t = this.addBehaviorKey(t),
                t = this.openDatabaseKey(t),
                t = this.cpuClassKey(t),
                t = this.platformKey(t),
                t = this.doNotTrackKey(t),
                t = this.pluginsKey(t),
                t = this.canvasKey(t),
                t = this.webglKey(t),
                t = this.adBlockKey(t),
                t = this.hasLiedLanguagesKey(t),
                t = this.hasLiedResolutionKey(t),
                t = this.hasLiedOsKey(t),
                t = this.hasLiedBrowserKey(t),
                t = this.touchSupportKey(t),
                t = this.customEntropyFunction(t);
                var i = this;
                this.fontsKey(t, function(t) {
                    var a = [];
                    i.each(t, function(e) {
                        var t = e.value;
                        void 0 !== e.value.join && (t = e.value.join(";")),
                        a.push(t)
                    });
                    var r = i.x64hash128(a.join("~~~"), 31);
                    return e(r, t)
                })
            },
            customEntropyFunction: function(e) {
                return "function" == typeof this.options.customFunction && e.push({
                    key: "custom",
                    value: this.options.customFunction()
                }),
                e
            },
            userAgentKey: function(e) {
                return this.options.excludeUserAgent || e.push({
                    key: "user_agent",
                    value: this.getUserAgent()
                }),
                e
            },
            getUserAgent: function() {
                return navigator.userAgent.replace(/AppleWebKit\/(\d+\.?)*/, "AppleWebKit").replace(/Chrome\/(\d+\.?)*/, "Chrome").replace(/Safari\/(\d+\.?)*/, "Safari")
            },
            languageKey: function(e) {
                return this.options.excludeLanguage || e.push({
                    key: "language",
                    value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
                }),
                e
            },
            colorDepthKey: function(e) {
                return this.options.excludeColorDepth || e.push({
                    key: "color_depth",
                    value: screen.colorDepth || -1
                }),
                e
            },
            pixelRatioKey: function(e) {
                return this.options.excludePixelRatio || e.push({
                    key: "pixel_ratio",
                    value: this.getPixelRatio()
                }),
                e
            },
            getPixelRatio: function() {
                return window.devicePixelRatio || ""
            },
            screenResolutionKey: function(e) {
                return this.options.excludeScreenResolution ? e : this.getScreenResolution(e)
            },
            getScreenResolution: function(e) {
                var t;
                return t = this.options.detectScreenOrientation && screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height],
                void 0 !== t && e.push({
                    key: "resolution",
                    value: t
                }),
                e
            },
            availableScreenResolutionKey: function(e) {
                return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e)
            },
            getAvailableScreenResolution: function(e) {
                var t;
                return screen.availWidth && screen.availHeight && (t = this.options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight] : [screen.availHeight, screen.availWidth]),
                void 0 !== t && e.push({
                    key: "available_resolution",
                    value: t
                }),
                e
            },
            timezoneOffsetKey: function(e) {
                return this.options.excludeTimezoneOffset || e.push({
                    key: "timezone_offset",
                    value: (new Date).getTimezoneOffset()
                }),
                e
            },
            sessionStorageKey: function(e) {
                return !this.options.excludeSessionStorage && this.hasSessionStorage() && e.push({
                    key: "session_storage",
                    value: 1
                }),
                e
            },
            localStorageKey: function(e) {
                return !this.options.excludeSessionStorage && this.hasLocalStorage() && e.push({
                    key: "local_storage",
                    value: 1
                }),
                e
            },
            indexedDbKey: function(e) {
                return !this.options.excludeIndexedDB && this.hasIndexedDB() && e.push({
                    key: "indexed_db",
                    value: 1
                }),
                e
            },
            addBehaviorKey: function(e) {
                return document.body && !this.options.excludeAddBehavior && document.body.addBehavior && e.push({
                    key: "add_behavior",
                    value: 1
                }),
                e
            },
            openDatabaseKey: function(e) {
                return !this.options.excludeOpenDatabase && window.openDatabase && e.push({
                    key: "open_database",
                    value: 1
                }),
                e
            },
            cpuClassKey: function(e) {
                return this.options.excludeCpuClass || e.push({
                    key: "cpu_class",
                    value: this.getNavigatorCpuClass()
                }),
                e
            },
            platformKey: function(e) {
                return this.options.excludePlatform || e.push({
                    key: "navigator_platform",
                    value: this.getNavigatorPlatform()
                }),
                e
            },
            doNotTrackKey: function(e) {
                return this.options.excludeDoNotTrack || e.push({
                    key: "do_not_track",
                    value: this.getDoNotTrack()
                }),
                e
            },
            canvasKey: function(e) {
                return !this.options.excludeCanvas && this.isCanvasSupported() && e.push({
                    key: "canvas",
                    value: this.getCanvasFp()
                }),
                e
            },
            webglKey: function(e) {
                return this.options.excludeWebGL ? e : this.isWebGlSupported() ? (e.push({
                    key: "webgl",
                    value: this.getWebglFp()
                }),
                e) : e
            },
            adBlockKey: function(e) {
                return this.options.excludeAdBlock || e.push({
                    key: "adblock",
                    value: this.getAdBlock()
                }),
                e
            },
            hasLiedLanguagesKey: function(e) {
                return this.options.excludeHasLiedLanguages || e.push({
                    key: "has_lied_languages",
                    value: this.getHasLiedLanguages()
                }),
                e
            },
            hasLiedResolutionKey: function(e) {
                return this.options.excludeHasLiedResolution || e.push({
                    key: "has_lied_resolution",
                    value: this.getHasLiedResolution()
                }),
                e
            },
            hasLiedOsKey: function(e) {
                return this.options.excludeHasLiedOs || e.push({
                    key: "has_lied_os",
                    value: this.getHasLiedOs()
                }),
                e
            },
            hasLiedBrowserKey: function(e) {
                return this.options.excludeHasLiedBrowser || e.push({
                    key: "has_lied_browser",
                    value: this.getHasLiedBrowser()
                }),
                e
            },
            fontsKey: function(e, t) {
                return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t)
            },
            flashFontsKey: function(e, t) {
                return this.options.excludeFlashFonts ? t(e) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? void 0 === this.options.swfPath ? t(e) : void this.loadSwfAndDetectFonts(function(i) {
                    e.push({
                        key: "swf_fonts",
                        value: i.join(";")
                    }),
                    t(e)
                }) : t(e)
            },
            jsFontsKey: function(e, t) {
                var i = this;
                return setTimeout(function() {
                    var a = ["monospace", "sans-serif", "serif"]
                      , r = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"]
                      , n = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
                    i.options.extendedJsFonts && (r = r.concat(n)),
                    r = r.concat(i.options.userDefinedFonts);
                    var o = "mmmmmmmmmmlli"
                      , s = "72px"
                      , l = document.getElementsByTagName("body")[0]
                      , h = document.createElement("div")
                      , u = document.createElement("div")
                      , c = {}
                      , d = {}
                      , g = function() {
                        var e = document.createElement("span");
                        return e.style.position = "absolute",
                        e.style.left = "-9999px",
                        e.style.fontSize = s,
                        e.style.lineHeight = "normal",
                        e.innerHTML = o,
                        e
                    }
                      , p = function(e, t) {
                        var i = g();
                        return i.style.fontFamily = "'" + e + "'," + t,
                        i
                    }
                      , f = function() {
                        for (var e = [], t = 0, i = a.length; i > t; t++) {
                            var r = g();
                            r.style.fontFamily = a[t],
                            h.appendChild(r),
                            e.push(r)
                        }
                        return e
                    }
                      , m = function() {
                        for (var e = {}, t = 0, i = r.length; i > t; t++) {
                            for (var n = [], o = 0, s = a.length; s > o; o++) {
                                var l = p(r[t], a[o]);
                                u.appendChild(l),
                                n.push(l)
                            }
                            e[r[t]] = n
                        }
                        return e
                    }
                      , S = function(e) {
                        for (var t = !1, i = 0; i < a.length; i++)
                            if (t = e[i].offsetWidth !== c[a[i]] || e[i].offsetHeight !== d[a[i]])
                                return t;
                        return t
                    }
                      , T = f();
                    l.appendChild(h);
                    for (var x = 0, v = a.length; v > x; x++)
                        c[a[x]] = T[x].offsetWidth,
                        d[a[x]] = T[x].offsetHeight;
                    var E = m();
                    l.appendChild(u);
                    for (var M = [], A = 0, C = r.length; C > A; A++)
                        S(E[r[A]]) && M.push(r[A]);
                    l.removeChild(u),
                    l.removeChild(h),
                    e.push({
                        key: "js_fonts",
                        value: M
                    }),
                    t(e)
                }, 1)
            },
            pluginsKey: function(e) {
                return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.push({
                    key: "ie_plugins",
                    value: this.getIEPlugins()
                }) : e.push({
                    key: "regular_plugins",
                    value: this.getRegularPlugins()
                })),
                e
            },
            getRegularPlugins: function() {
                for (var e = [], t = 0, i = navigator.plugins.length; i > t; t++)
                    e.push(navigator.plugins[t]);
                return this.pluginsShouldBeSorted() && (e = e.sort(function(e, t) {
                    return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
                })),
                this.map(e, function(e) {
                    var t = this.map(e, function(e) {
                        return [e.type, e.suffixes].join("~")
                    }).join(",");
                    return [e.name, e.description, t].join("::").replace(/(\.\d+)*/g, "")
                }, this)
            },
            getIEPlugins: function() {
                var e = [];
                if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject"in window) {
                    var t = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
                    e = this.map(t, function(e) {
                        try {
                            return new ActiveXObject(e),
                            e
                        } catch (t) {
                            return null
                        }
                    })
                }
                return navigator.plugins && (e = e.concat(this.getRegularPlugins())),
                e
            },
            pluginsShouldBeSorted: function() {
                for (var e = !1, t = 0, i = this.options.sortPluginsFor.length; i > t; t++) {
                    var a = this.options.sortPluginsFor[t];
                    if (navigator.userAgent.match(a)) {
                        e = !0;
                        break
                    }
                }
                return e
            },
            touchSupportKey: function(e) {
                return this.options.excludeTouchSupport || e.push({
                    key: "touch_support",
                    value: this.getTouchSupport()
                }),
                e
            },
            hardwareConcurrencyKey: function(e) {
                return this.options.excludeHardwareConcurrency || e.push({
                    key: "hardware_concurrency",
                    value: this.getHardwareConcurrency()
                }),
                e
            },
            hasSessionStorage: function() {
                try {
                    return !!window.sessionStorage
                } catch (e) {
                    return !0
                }
            },
            hasLocalStorage: function() {
                try {
                    return !!window.localStorage
                } catch (e) {
                    return !0
                }
            },
            hasIndexedDB: function() {
                try {
                    return !!window.indexedDB
                } catch (e) {
                    return !0
                }
            },
            getHardwareConcurrency: function() {
                return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown"
            },
            getNavigatorCpuClass: function() {
                return navigator.cpuClass ? navigator.cpuClass : "unknown"
            },
            getNavigatorPlatform: function() {
                return navigator.platform ? navigator.platform : "unknown"
            },
            getDoNotTrack: function() {
                return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown"
            },
            getTouchSupport: function() {
                var e = 0
                  , t = !1;
                void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
                try {
                    document.createEvent("TouchEvent"),
                    t = !0
                } catch (i) {}
                var a = "ontouchstart"in window;
                return [e, t, a]
            },
            getCanvasFp: function() {
                var e = []
                  , t = document.createElement("canvas");
                t.width = 2e3,
                t.height = 200,
                t.style.display = "inline";
                var i = t.getContext("2d");
                return i.rect(0, 0, 10, 10),
                i.rect(2, 2, 6, 6),
                e.push("canvas winding:" + (i.isPointInPath(5, 5, "evenodd") === !1 ? "yes" : "no")),
                i.textBaseline = "alphabetic",
                i.fillStyle = "#f60",
                i.fillRect(125, 1, 62, 20),
                i.fillStyle = "#069",
                i.font = this.options.dontUseFakeFontInCanvas ? "11pt Arial" : "11pt no-real-font-123",
                i.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15),
                i.fillStyle = "rgba(102, 204, 0, 0.2)",
                i.font = "18pt Arial",
                i.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45),
                i.globalCompositeOperation = "multiply",
                i.fillStyle = "rgb(255,0,255)",
                i.beginPath(),
                i.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                i.closePath(),
                i.fill(),
                i.fillStyle = "rgb(0,255,255)",
                i.beginPath(),
                i.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                i.closePath(),
                i.fill(),
                i.fillStyle = "rgb(255,255,0)",
                i.beginPath(),
                i.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                i.closePath(),
                i.fill(),
                i.fillStyle = "rgb(255,0,255)",
                i.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                i.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                i.fill("evenodd"),
                e.push("canvas fp:" + t.toDataURL()),
                e.join("~")
            },
            getWebglFp: function() {
                var e, t = function(t) {
                    return e.clearColor(0, 0, 0, 1),
                    e.enable(e.DEPTH_TEST),
                    e.depthFunc(e.LEQUAL),
                    e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                    "[" + t[0] + ", " + t[1] + "]"
                }, i = function(e) {
                    var t, i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                    return i ? (t = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT),
                    0 === t && (t = 2),
                    t) : null
                };
                if (e = this.getWebglCanvas(),
                !e)
                    return null;
                var a = []
                  , r = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
                  , n = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
                  , o = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, o);
                var s = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                e.bufferData(e.ARRAY_BUFFER, s, e.STATIC_DRAW),
                o.itemSize = 3,
                o.numItems = 3;
                var l = e.createProgram()
                  , h = e.createShader(e.VERTEX_SHADER);
                e.shaderSource(h, r),
                e.compileShader(h);
                var u = e.createShader(e.FRAGMENT_SHADER);
                e.shaderSource(u, n),
                e.compileShader(u),
                e.attachShader(l, h),
                e.attachShader(l, u),
                e.linkProgram(l),
                e.useProgram(l),
                l.vertexPosAttrib = e.getAttribLocation(l, "attrVertex"),
                l.offsetUniform = e.getUniformLocation(l, "uniformOffset"),
                e.enableVertexAttribArray(l.vertexPosArray),
                e.vertexAttribPointer(l.vertexPosAttrib, o.itemSize, e.FLOAT, !1, 0, 0),
                e.uniform2f(l.offsetUniform, 1, 1),
                e.drawArrays(e.TRIANGLE_STRIP, 0, o.numItems),
                null != e.canvas && a.push(e.canvas.toDataURL()),
                a.push("extensions:" + e.getSupportedExtensions().join(";")),
                a.push("webgl aliased line width range:" + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))),
                a.push("webgl aliased point size range:" + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))),
                a.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)),
                a.push("webgl antialiasing:" + (e.getContextAttributes().antialias ? "yes" : "no")),
                a.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)),
                a.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)),
                a.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)),
                a.push("webgl max anisotropy:" + i(e)),
                a.push("webgl max combined texture image units:" + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),
                a.push("webgl max cube map texture size:" + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)),
                a.push("webgl max fragment uniform vectors:" + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)),
                a.push("webgl max render buffer size:" + e.getParameter(e.MAX_RENDERBUFFER_SIZE)),
                a.push("webgl max texture image units:" + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)),
                a.push("webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)),
                a.push("webgl max varying vectors:" + e.getParameter(e.MAX_VARYING_VECTORS)),
                a.push("webgl max vertex attribs:" + e.getParameter(e.MAX_VERTEX_ATTRIBS)),
                a.push("webgl max vertex texture image units:" + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),
                a.push("webgl max vertex uniform vectors:" + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)),
                a.push("webgl max viewport dims:" + t(e.getParameter(e.MAX_VIEWPORT_DIMS))),
                a.push("webgl red bits:" + e.getParameter(e.RED_BITS)),
                a.push("webgl renderer:" + e.getParameter(e.RENDERER)),
                a.push("webgl shading language version:" + e.getParameter(e.SHADING_LANGUAGE_VERSION)),
                a.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)),
                a.push("webgl vendor:" + e.getParameter(e.VENDOR)),
                a.push("webgl version:" + e.getParameter(e.VERSION));
                try {
                    var c = e.getExtension("WEBGL_debug_renderer_info");
                    c && (a.push("webgl unmasked vendor:" + e.getParameter(c.UNMASKED_VENDOR_WEBGL)),
                    a.push("webgl unmasked renderer:" + e.getParameter(c.UNMASKED_RENDERER_WEBGL)))
                } catch (d) {}
                return e.getShaderPrecisionFormat ? (a.push("webgl vertex shader high float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision),
                a.push("webgl vertex shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMin),
                a.push("webgl vertex shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMax),
                a.push("webgl vertex shader medium float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision),
                a.push("webgl vertex shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMin),
                a.push("webgl vertex shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMax),
                a.push("webgl vertex shader low float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).precision),
                a.push("webgl vertex shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMin),
                a.push("webgl vertex shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMax),
                a.push("webgl fragment shader high float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision),
                a.push("webgl fragment shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMin),
                a.push("webgl fragment shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMax),
                a.push("webgl fragment shader medium float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision),
                a.push("webgl fragment shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMin),
                a.push("webgl fragment shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMax),
                a.push("webgl fragment shader low float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).precision),
                a.push("webgl fragment shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMin),
                a.push("webgl fragment shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMax),
                a.push("webgl vertex shader high int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).precision),
                a.push("webgl vertex shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMin),
                a.push("webgl vertex shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMax),
                a.push("webgl vertex shader medium int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).precision),
                a.push("webgl vertex shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMin),
                a.push("webgl vertex shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMax),
                a.push("webgl vertex shader low int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).precision),
                a.push("webgl vertex shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMin),
                a.push("webgl vertex shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMax),
                a.push("webgl fragment shader high int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).precision),
                a.push("webgl fragment shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMin),
                a.push("webgl fragment shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMax),
                a.push("webgl fragment shader medium int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).precision),
                a.push("webgl fragment shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMin),
                a.push("webgl fragment shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMax),
                a.push("webgl fragment shader low int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).precision),
                a.push("webgl fragment shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMin),
                a.push("webgl fragment shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMax),
                a.join("~")) : a.join("~")
            },
            getAdBlock: function() {
                var e = document.createElement("div");
                e.innerHTML = "&nbsp;",
                e.className = "adsbox";
                var t = !1;
                try {
                    document.body.appendChild(e),
                    t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight,
                    document.body.removeChild(e)
                } catch (i) {
                    t = !1
                }
                return t
            },
            getHasLiedLanguages: function() {
                if (void 0 !== navigator.languages)
                    try {
                        var e = navigator.languages[0].substr(0, 2);
                        if (e !== navigator.language.substr(0, 2))
                            return !0
                    } catch (t) {
                        return !0
                    }
                return !1
            },
            getHasLiedResolution: function() {
                return screen.width < screen.availWidth ? !0 : screen.height < screen.availHeight ? !0 : !1
            },
            getHasLiedOs: function() {
                var e, t = navigator.userAgent.toLowerCase(), i = navigator.oscpu, a = navigator.platform.toLowerCase();
                e = t.indexOf("windows phone") < 0 ? t.indexOf("win") < 0 ? t.indexOf("android") < 0 ? t.indexOf("linux") < 0 ? t.indexOf("iphone") < 0 && t.indexOf("ipad") < 0 ? t.indexOf("mac") < 0 ? "Other" : "Mac" : "iOS" : "Linux" : "Android" : "Windows" : "Windows Phone";
                var r;
                if (r = "ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? !0 : !1,
                r && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e)
                    return !0;
                if (void 0 !== i) {
                    if (i = i.toLowerCase(),
                    i.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e)
                        return !0;
                    if (i.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e)
                        return !0;
                    if (i.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e)
                        return !0;
                    if (0 === i.indexOf("win") && 0 === i.indexOf("linux") && i.indexOf("mac") >= 0 && "other" !== e)
                        return !0
                }
                return (a.indexOf("win") < 0 || "Windows" === e || "Windows Phone" === e) && (a.indexOf("linux") < 0 && a.indexOf("android") < 0 && a.indexOf("pike") < 0 || "Linux" === e || "Android" === e) && (a.indexOf("mac") < 0 && a.indexOf("ipad") < 0 && a.indexOf("ipod") < 0 && a.indexOf("iphone") < 0 || "Mac" === e || "iOS" === e) && (0 !== a.indexOf("win") || 0 !== a.indexOf("linux") || a.indexOf("mac") < 0 || "other" === e) ? void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e ? !0 : !1 : !0
            },
            getHasLiedBrowser: function() {
                var e, t = navigator.userAgent.toLowerCase(), i = navigator.productSub;
                if (e = t.indexOf("firefox") < 0 ? t.indexOf("opera") < 0 && t.indexOf("opr") < 0 ? t.indexOf("chrome") < 0 ? t.indexOf("safari") < 0 ? t.indexOf("trident") < 0 ? "Other" : "Internet Explorer" : "Safari" : "Chrome" : "Opera" : "Firefox",
                ("Chrome" === e || "Safari" === e || "Opera" === e) && "20030107" !== i)
                    return !0;
                var a = ("" + eval).length;
                if (37 === a && "Safari" !== e && "Firefox" !== e && "Other" !== e)
                    return !0;
                if (39 === a && "Internet Explorer" !== e && "Other" !== e)
                    return !0;
                if (33 === a && "Chrome" !== e && "Opera" !== e && "Other" !== e)
                    return !0;
                var r;
                try {
                    throw "a"
                } catch (n) {
                    try {
                        n.toSource(),
                        r = !0
                    } catch (o) {
                        r = !1
                    }
                }
                return r && "Firefox" !== e && "Other" !== e ? !0 : !1
            },
            isCanvasSupported: function() {
                var e = document.createElement("canvas");
                return !(!e.getContext || !e.getContext("2d"))
            },
            isWebGlSupported: function() {
                if (!this.isCanvasSupported())
                    return !1;
                var e, t = document.createElement("canvas");
                try {
                    e = t.getContext && (t.getContext("webgl") || t.getContext("experimental-webgl"))
                } catch (i) {
                    e = !1
                }
                return !!window.WebGLRenderingContext && !!e
            },
            isIE: function() {
                return "Microsoft Internet Explorer" === navigator.appName ? !0 : "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
            },
            hasSwfObjectLoaded: function() {
                return void 0 !== window.swfobject
            },
            hasMinFlashInstalled: function() {
                return swfobject.hasFlashPlayerVersion("9.0.0")
            },
            addFlashDivNode: function() {
                var e = document.createElement("div");
                e.setAttribute("id", this.options.swfContainerId),
                document.body.appendChild(e)
            },
            loadSwfAndDetectFonts: function(e) {
                var t = "___fp_swf_loaded";
                window[t] = function(t) {
                    e(t)
                }
                ;
                var i = this.options.swfContainerId;
                this.addFlashDivNode();
                var a = {
                    onReady: t
                }
                  , r = {
                    allowScriptAccess: "always",
                    menu: "false"
                };
                swfobject.embedSWF(this.options.swfPath, i, "1", "1", "9.0.0", !1, a, r, {})
            },
            getWebglCanvas: function() {
                var e = document.createElement("canvas")
                  , t = null;
                try {
                    t = e.getContext("webgl") || e.getContext("experimental-webgl")
                } catch (i) {}
                return t || (t = null),
                t
            },
            each: function(e, t, i) {
                if (null !== e)
                    if (this.nativeForEach && e.forEach === this.nativeForEach)
                        e.forEach(t, i);
                    else if (e.length === +e.length) {
                        for (var a = 0, r = e.length; r > a; a++)
                            if (t.call(i, e[a], a, e) === {})
                                return
                    } else
                        for (var n in e)
                            if (e.hasOwnProperty(n) && t.call(i, e[n], n, e) === {})
                                return
            },
            map: function(e, t, i) {
                var a = [];
                return null == e ? a : this.nativeMap && e.map === this.nativeMap ? e.map(t, i) : (this.each(e, function(e, r, n) {
                    a[a.length] = t.call(i, e, r, n)
                }),
                a)
            },
            x64Add: function(e, t) {
                e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
                t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                var i = [0, 0, 0, 0];
                return i[3] += e[3] + t[3],
                i[2] += i[3] >>> 16,
                i[3] &= 65535,
                i[2] += e[2] + t[2],
                i[1] += i[2] >>> 16,
                i[2] &= 65535,
                i[1] += e[1] + t[1],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[0] += e[0] + t[0],
                i[0] &= 65535,
                [i[0] << 16 | i[1], i[2] << 16 | i[3]]
            },
            x64Multiply: function(e, t) {
                e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
                t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                var i = [0, 0, 0, 0];
                return i[3] += e[3] * t[3],
                i[2] += i[3] >>> 16,
                i[3] &= 65535,
                i[2] += e[2] * t[3],
                i[1] += i[2] >>> 16,
                i[2] &= 65535,
                i[2] += e[3] * t[2],
                i[1] += i[2] >>> 16,
                i[2] &= 65535,
                i[1] += e[1] * t[3],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[1] += e[2] * t[2],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[1] += e[3] * t[1],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0],
                i[0] &= 65535,
                [i[0] << 16 | i[1], i[2] << 16 | i[3]]
            },
            x64Rotl: function(e, t) {
                return t %= 64,
                32 === t ? [e[1], e[0]] : 32 > t ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32,
                [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
            },
            x64LeftShift: function(e, t) {
                return t %= 64,
                0 === t ? e : 32 > t ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
            },
            x64Xor: function(e, t) {
                return [e[0] ^ t[0], e[1] ^ t[1]]
            },
            x64Fmix: function(e) {
                return e = this.x64Xor(e, [0, e[0] >>> 1]),
                e = this.x64Multiply(e, [4283543511, 3981806797]),
                e = this.x64Xor(e, [0, e[0] >>> 1]),
                e = this.x64Multiply(e, [3301882366, 444984403]),
                e = this.x64Xor(e, [0, e[0] >>> 1])
            },
            x64hash128: function(e, t) {
                e = e || "",
                t = t || 0;
                for (var i = e.length % 16, a = e.length - i, r = [0, t], n = [0, t], o = [0, 0], s = [0, 0], l = [2277735313, 289559509], h = [1291169091, 658871167], u = 0; a > u; u += 16)
                    o = [255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24],
                    s = [255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24],
                    o = this.x64Multiply(o, l),
                    o = this.x64Rotl(o, 31),
                    o = this.x64Multiply(o, h),
                    r = this.x64Xor(r, o),
                    r = this.x64Rotl(r, 27),
                    r = this.x64Add(r, n),
                    r = this.x64Add(this.x64Multiply(r, [0, 5]), [0, 1390208809]),
                    s = this.x64Multiply(s, h),
                    s = this.x64Rotl(s, 33),
                    s = this.x64Multiply(s, l),
                    n = this.x64Xor(n, s),
                    n = this.x64Rotl(n, 31),
                    n = this.x64Add(n, r),
                    n = this.x64Add(this.x64Multiply(n, [0, 5]), [0, 944331445]);
                switch (o = [0, 0],
                s = [0, 0],
                i) {
                case 15:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 14)], 48));
                case 14:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 13)], 40));
                case 13:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 12)], 32));
                case 12:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 11)], 24));
                case 11:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 10)], 16));
                case 10:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 9)], 8));
                case 9:
                    s = this.x64Xor(s, [0, e.charCodeAt(u + 8)]),
                    s = this.x64Multiply(s, h),
                    s = this.x64Rotl(s, 33),
                    s = this.x64Multiply(s, l),
                    n = this.x64Xor(n, s);
                case 8:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 7)], 56));
                case 7:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 6)], 48));
                case 6:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 5)], 40));
                case 5:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 4)], 32));
                case 4:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 3)], 24));
                case 3:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 2)], 16));
                case 2:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 1)], 8));
                case 1:
                    o = this.x64Xor(o, [0, e.charCodeAt(u)]),
                    o = this.x64Multiply(o, l),
                    o = this.x64Rotl(o, 31),
                    o = this.x64Multiply(o, h),
                    r = this.x64Xor(r, o)
                }
                return r = this.x64Xor(r, [0, e.length]),
                n = this.x64Xor(n, [0, e.length]),
                r = this.x64Add(r, n),
                n = this.x64Add(n, r),
                r = this.x64Fmix(r),
                n = this.x64Fmix(n),
                r = this.x64Add(r, n),
                n = this.x64Add(n, r),
                ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[1] >>> 0).toString(16)).slice(-8)
            }
        },
        e.VERSION = "1.5.1",
        e
    });
    if (!localStorage.t) {
        new Fingerprint2().get(function(r, c) {
            localStorage.t = r
        })
    }
    function drawTable(t, e) {
        for (var r = kendo.template('<table class="table table-hover table-striped"><thead><tr># for (var i = 0, l = data.columns.length; i < l; i++) {## if (parseInt(data.columns[i].colspan)) {#<th colspan="#= data.columns[i].colspan #" class="#= data.columns[i].class#"> #= data.columns[i].title # </th>#}##}#</tr></thead><tbody># for (var j = 0, k = data.dataSource.length; j < k; j++) {#<tr># for (var i = 0, l = data.columns.length; i < l; i++) {#<td> #= data.dataSource[j][data.columns[i].field] # </td>#}#</tr>#}#</tbody></table>'), a = {
            columns: t,
            dataSource: JSON.parse(JSON.stringify(e))
        }, n = [], i = 0, s = a.columns.length; s > i; i++)
            void 0 !== a.columns[i].template && n.push([i, kendo.template(a.columns[i].template)]),
            void 0 === a.columns[i].class && (a.columns[i].class = ""),
            a.columns[i].colspan = void 0 !== a.columns[i].colspan ? parseInt(a.columns[i].colspan) : 1;
        if (n.length)
            for (var o = 0, l = a.dataSource.length; l > o; o++)
                for (var c in n)
                    a.dataSource[o][a.columns[n[c][0]].field] = n[c][1](a.dataSource[o]);
        return r(a)
    }
    function calculateTotals(t) {
        if (window.total = 0,
        window.volume = 0,
        Array.isArray(t))
            for (var e = 0; e < t.length; e++)
                t[e].price = parseInt(calculatePrice(parseInt(t[e].l), parseInt(t[e].w), parseInt(t[e].d), parseInt(t[e].p))) * ((100 - parseFloat($("#discount").val())) / 100),
                t[e].price = Math.round(t[e].price),
                t[e].total = Math.round(t[e].price * (1 + (parseInt(t[e].inc) || 0) / 100) * parseInt(t[e].a)),
                t[e].volume = parseInt(t[e].l) / 100 * parseInt(t[e].w) / 100 * parseInt(t[e].d) / 100 * parseInt(t[e].a),
                window.total += t[e].total,
                window.volume += t[e].volume,
                $("#grid").find("tbody tr:eq(" + e + ") td:eq(5)").html(t[e].price),
                $("#grid").find("tbody tr:eq(" + e + ") td:eq(6)").html(t[e].total)
    }
    function drawOrderTable(t) {
        Array.isArray(t) && (!function() {
            if (0 == $("#sourceDataType").val())
                for (var i = 0; i < r.length; i++)
                    r[i].lwd = 10 * r[i].l + " * " + 10 * r[i].w + " * " + 10 * r[i].d;
        }(),
        calculateTotals(t),
        $("#priceListTable").html(drawTable([{
            title: "<span class='visible-xs visible-sm hidden-print'>Размер</span><span class='visible-md visible-lg hidden-print'>Размер изделия</span><span class='visible-print'>Размер</span>",
            field: "lwd",
            "class": "col-xs-3"
        }, {
            title: "<span class='visible-xs hidden-print'>П</span><span class='visible-sm hidden-print'>Пол-ка</span><span class='visible-md visible-lg hidden-print'>Полировка</span><span class='visible-print'>Полировка</span>",
            field: "p",
            "class": "col-xs-2"
        }, {
            title: "<span class='visible-xs hidden-print'>#</span><span class='visible-sm hidden-print'>Кол-во</span><span class='visible-md visible-lg hidden-print'>Количество</span><span class='visible-print'>Кол-во</span>",
            field: "a",
            "class": "col-xs-2"
        }, {
            title: "<span class='hidden-print'>Цена</span><span class='visible-print'>Цена</span>",
            field: "price",
            "class": "col-xs-2"
        }, {
            title: "<span class='visible-xs visible-sm hidden-print'>Нц</span><span class='visible-md visible-lg hidden-print'>Наценка</span><span class='visible-print'>Наценка</span>",
            field: "inc"
        }, {
            title: "<span class='visible-xs visible-sm hidden-print'>Сумма</span><span class='visible-md visible-lg hidden-print'>Сумма</span><span class='visible-print'>Сумма</span>",
            field: "total",
            "class": "col-xs-2"
        }], t)),
        $("#priceListTable").data("data", t),
        $("#priceListTable").find("tbody").after("<tfoot>" + (window.incount > 1 ? "<tr ><td colspan='5' style='text-align: right; font-weight: bold; color: red; line-height: 1.2;' class='hidden-print'>ВНИМАНИЕ: в этот заказ входят нестандартные детали. Производство продукции по этому заказу будет осуществляться дольше обычного.<br>К расчету применена наценка.</td></tr>" : "") + "<tr><td colspan='6' style='text-align: right;'><div class='visible-print' style='height: 20px;'>&nbsp;</div>Итого" + (parseFloat($("#discount").val()) ? " (со скидкой " + parseFloat($("#discount").val()) + "%)" : "") + ": <b>" + kendo.toString(window.total, "n0").replace(/\,/gi, " ") + " руб. </b> (" + Math.round(1e3 * window.volume) / 1e3 + " м<sup>3</sup>, " + kendo.toString(Math.round(3200 * window.volume), "n0").replace(/\,/gi, " ") + " кг.)" + (window.nstds ? ("<div class='hidden-print' style='margin-top: 10px;font-weight: bold;color: red;'>*** нестандартная продукция, применяются наценки.<br><br>Чтобы получить максимально выгодную цену заказывайте партиями от 10 штук.</div>") : "") + "</td></tr></tfoot>"))
    }
    function dlg() {
        $("#myModal").modal({
            show: !0
        }),
        $("#myModal .btn-success").click(function() {
            $("#myModal .phone").remove();
            var e = $("#phone").val();
            return 10 != e.length ? void $("#phone").addClass("btn-danger").parent().after("<p class='phone'><br><label style='color: red;'>Номер телефона должен состоять из 10 цифр.</label></p>") : ($("#phone").removeClass("btn-danger").attr("disabled", !0),
            $(this).attr("disabled", !0),
            void _a({
                url: "https://www.sdb.gr/cdb",
                data: {
                    token: gt(),
                    number: e,
                    type: "SMS_VERIFICATION"
                }
            }, function(l) {
                return l.result ? "VERIFIED" == l.response ? ($(".modal-backdrop").remove(),
                localStorage.p = $("#phone").val(),
                $("#myModal .btn-default:hidden").click(),
                $(".modal-backdrop").remove(),
                setTimeout(function() {
                    $(".modal-backdrop").remove()
                }, 500),
                localStorage.v = 1,
                void tokenize()) : ($("#phone").parent().after('<div class="input-group" style="width: 100%; margin-top: 10px;"><span class="input-group-addon" style="width: 116px;">Код из SMS:</span><input id="code" class="form-control " type="text" value="" placeholder="0000" oninput=this.value = this.value.replace(/[^0-9.]/g, \'\'); this.value = this.value.replace(/(..*)./g, \'$1\').substr(0,4);"></div>'),
                $("#myModal .modal-title").html("Введите проверочный код из SMS"),
                $("#code").focus(),
                void $("#myModal .btn-success").unbind().removeAttr("disabled").click(function() {
                    return $("#myModal .code").remove(),
                    4 != $("#code").val().length ? void $("#code").addClass("btn-danger").parent().after("<p class='code'><br><label style='color: red;'>Код должен состоять из 4 цифр.</label></p>") : ($("#code").attr("disabled", !0),
                    void _a({
                        url: "https://www.sdb.gr/cdb",
                        data: {
                            token: gt(),
                            number: $("#phone").val(),
                            code: $("#code").val(),
                            type: "SMS_VERIFICATION_2"
                        }
                    }, function(e) {
                        e.result ? (localStorage.p = $("#phone").val(),
                        $(".modal-backdrop").remove(),
                        $("#myModal .btn-default:hidden").click(),
                        $(".modal-backdrop").remove(),
                        setTimeout(function() {
                            $(".modal-backdrop").remove()
                        }, 500),
                        localStorage.v = 1,
                        tokenize()) : $("#code").removeAttr("disabled").addClass("btn-danger").parent().after("<p class='code'><br><label style='color: red;'>Код введен неверно, дождитесь получения СМС и введите правильный код.</label></p>")
                    }))
                })) : ($("#myModal .btn-success, #phone").removeAttr("disabled"),
                void $("#phone").parent().after("<p class='phone'><br><label style='color: red;'>Во время запроса произошла ошибка. Попробуйте отправить запрос еще раз.</label></p>"))
            }))
        })
    }
    function gt() {
        return localStorage.t
    }
    function sv(d) {
        try {
            var a = JSON.parse(localStorage.a || "[]");
            a.push(d);
            localStorage.a = JSON.stringify(a)
        } catch (e) {}
    }
    function gv() {
        try {
            return JSON.parse(localStorage.a).join('\n\n---------\n\n')
        } catch (e) {
            return ''
        }
    }
    function nv() {
        try {
            localStorage.a = ''
        } catch (e) {}
    }
    function tokenize() {
        if (!localStorage.v || !localStorage.p)
            return dlg();
        var t = $("#order").val().replace(/[xх*-]/gi, " ").replace(/лиц/gi, " 1 ").replace(/одн/gi, " 1 ").replace(/дву/gi, " 2 ").replace(/тре/gi, " 3 ").replace(/чет/gi, " 4 ").replace(/пят/gi, " 5 ").replace(/кру/gi, " 5 ").replace(/[^\d\s]+/gi, "")
          , _t = t;
        if ($("#order").val(t),
        t = t.split(/[\r\n]/i),
        r = [],
        t && "object" == typeof t)
            for (var e = 0; e < t.length; e++)
                if (t[e] = $.trim(t[e]).split(/\s+/i),
                t[e].length > 2) {
                    var a = parseInt(t[e][0].match(/\b\d+\b/)[0])
                      , n = parseInt(t[e][1].match(/\b\d+\b/)[0])
                      , i = parseInt(t[e][2].match(/\b\d+\b/)[0])
                      , s = parseInt(t[e].hasOwnProperty(4) && t[e].hasOwnProperty(3) ? t[e][3].match(/\b\d+\b/)[0] : 1)
                      , o = parseInt(t[e].hasOwnProperty(4) && t[e].hasOwnProperty(3) ? t[e][4].match(/\b\d+\b/)[0] : t[e].hasOwnProperty(3) ? t[e][3].match(/\b\d+\b/)[0] : 1);
                    (0 == parseInt($("#sourceDataType").val()) || 1 == parseInt($("#sourceDataType").val())) && (a /= parseInt($("#sourceDataType").val()) ? 1 : 10,
                    n /= parseInt($("#sourceDataType").val()) ? 1 : 10,
                    i /= parseInt($("#sourceDataType").val()) ? 1 : 10),
                    s = 0 > s || s > 5 ? 5 : s,
                    price = parseInt(calculatePrice(a, n, i, s)),
                    r.push({
                        l: a,
                        w: n,
                        d: i,
                        lwd: a + " * " + n + " * " + i,
                        cnt: o,
                        p: s + "-ст",
                        a: o,
                        t: getProductType(a, n, i),
                        token: getMin(a, n, i).join("*"),
                        std: isStd(a, n, i),
                        inc: "-",
                        price: price,
                        total: price * o,
                        volume: Math.round(100 * parseFloat(a / 100 * n / 100 * i / 100 * o)) / 100
                    })
                }
        for (var l = {}, e = 0; e < r.length; e++)
            l[r[e].token] ? l[r[e].token].cnt += r[e].a : l[r[e].token] = JSON.parse(JSON.stringify(r[e]));
        window.nstds = 0;
        window.v = 0;
        for (var e = 0; e < r.length; e++) {
            {
                window.v += l[r[e].token].cnt * l[r[e].token].l * l[r[e].token].w * l[r[e].token].d / 1e6
            }
            window.ind = l,
            0 == r[e].std && (isSemiStd(l[r[e].token].l, l[r[e].token].w, l[r[e].token].d) && l[r[e].token].cnt < 10 ? (r[e].inc = skn0,
            r[e].total *= 1.1) : 1 == l[r[e].token].cnt ? (r[e].inc = skn3,
            r[e].total *= 1.3) : l[r[e].token].cnt < 5 ? (r[e].inc = skn2,
            r[e].total *= 1.2) : l[r[e].token].cnt < 10 && (r[e].inc = skn1,
            r[e].total *= 1.1));
            if (parseFloat(r[e].inc) > 0) {
                r[e].lwd += skn4;
                window.nstds = 1
            }
        }
        drawOrderTable(r),
        window.scrollTo(0, $(window.document).height()),
        $(".info").remove();
        if (r.length)
            _a({
                url: 'https://www.sdb.gr/cdb',
                data: {
                    token: gt(),
                    number: localStorage.p,
                    order: _t,
                    offline: gv(),
                    type: "CUSTOMER_ORDER"
                }
            }, function(r) {
                if (r.result && r.response == "FAIL") {
                    localStorage.p = '';
                    dlg()
                } else if (r.result) {
                    nv()
                } else {
                    sv(_t)
                }
            })
    }
    function exportData() {
        var t = $("#priceListTable").data("data")
          , e = "Расчет заказа на памятники из габбро диабаза\r\n\r\n";
        e += "Длина	Ширина	Толщина	Полироddвка	Кол-во	Цена	Сумма\r\n";
        for (var r = 0, a = 0, n = 0; n < t.length; n++)
            e += (0 == parseInt($("#sourceDataType").val()) ? 10 : 1) * parseInt(t[n].l) + "	" + (0 == parseInt($("#sourceDataType").val()) ? 10 : 1) * parseInt(t[n].w) + "	" + (0 == parseInt($("#sourceDataType").val()) ? 10 : 1) * parseInt(t[n].d) + "	" + parseInt(t[n].p) + "-ст	" + parseInt(t[n].a) + "	" + parseInt(t[n].price) + "	" + parseInt(t[n].total) + "\r\n",
            r += t[n].total,
            a += t[n].volume;
        e += "\r\n\r\nИТОГО:\r\n",
        e += "\r\n  Сумма заказа:	" + (Math.round(100 * r) / 100 + " руб.") + (parseFloat($("#discount").val()) ? " (с учетом скидки)" : ""),
        parseFloat($("#discount").val()) && (e += "\r\n  Скидка:	" + $("#discount").val() + " %."),
        e += "\r\n  Объем заказа:	" + (Math.round(100 * a) / 100 + " м3"),
        e += "\r\n  Вес заказа:	" + (Math.round(3200 * a) + " кг."),
        $("#order").val(e),
        window.setTimeout(function() {
            $("#order").trigger("keyup")
        }, 50)
    }
    function getProductType(t, e, r) {
        var a = getMin(t, e, r)
          , n = null;
        return n = a[0] * a[1] <= 110 && a[1] + a[0] < 21 && a[1] / a[0] < 3 ? 3 : a[0] * a[1] < 400 && a[1] + a[0] < 40 ? a[1] / a[0] > 2 ? 1 : 2 : 1
    }
    function getMin(t) {
        for (var t = Array.isArray(arguments[0]) ? JSON.parse(JSON.stringify(arguments[0])) : Array.prototype.slice.call(arguments), e = 0; e < t.lenght; e++)
            t[e] = parseFloat(t[e]);
        return t.sort(function(t, e) {
            return t - e
        }),
        t
    }
    function getCubicMeterCost(t, e, r, a) {
        var n = 1.06;
        if (1 == t) {
            var i = 0
              , s = e * r / 1e4;
            switch (Math.round(a - .49)) {
            case 2:
                i = 2e5;
                break;
            case 3:
                i = 16e4;
                break;
            case 4:
                i = 15e4;
                break;
            case 5:
                i = 12e4;
                break;
            case 6:
                i = 102500;
                break;
            case 7:
                i = 95e3;
                break;
            case 8:
                i = 85e3;
                break;
            case 9:
                i = 85e3;
                break;
            case 10:
                i = 77500;
                break;
            case 11:
                i = 77500;
                break;
            case 12:
                i = 72500;
                break;
            case 13:
                i = 75e3;
                break;
            case 14:
                i = 75e3;
                break;
            case 15:
                i = 72500;
                break;
            case 20:
                i = 72500
            }
            return a > 15 && 31 > a && 20 != a ? i = 75e3 : a > 30 && (i = 75e3 * (100 + 3 * (a - 30)) / 100),
            k1 = Math.pow(s > 1.3 ? 1 + s - 1.3 : 1, .9) - (s > 1.5 ? Math.pow(1 + s - 1.5, .6) - 1 : 0) - (s > 1.7 ? Math.pow(1 + s - 1.7, .3) - 1 : 0),
            k2 = Math.pow(e > 130 ? (100 + e - 130) / 100 : 1, .9) - (e > 150 ? Math.pow((100 + e - 150) / 100, .7) - 1 : 0) - (e > 170 ? Math.pow((100 + e - 170) / 100, .5) - 1 : 0) - (e > 170 ? Math.pow((100 + e - 170) / 100, .3) - 1 : 0),
            n * k1 * k2 * i
        }
        if (2 == t) {
            var i = getCubicMeterCost(1, e, r, a) * Math.pow(e > 70 ? (100 + e - 70) / 100 : 1, .2);
            return i
        }
        if (3 == t) {
            var i = 0
              , s = r * a;
            return 26 > s ? i = 400 : 41 > s ? i = 440 : 51 > s ? i = 500 : 61 > s ? i = 550 : 65 > s ? i = 550 : 81 > s ? i = 600 : s > 110 || (i = 650),
            n * (e > 120 ? i * Math.pow((100 + e - 120) / 100, .5) : i) * 1e4 / (r * a)
        }
        return 0
    }
    function calculatePrice(t, e, r, a) {
        var n = getMin(t, e, r)
          , i = getProductType(n[2], n[1], n[0])
          , s = getCubicMeterCost(i, n[2], n[1], n[0]) * (n[0] > 4 && n[2] * n[1] * n[0] < 1e4 && n[2] + n[1] < 50 ? 2.2 : 1) * (n[0] > 4 || n[1] >= 30 && n[2] >= 30 ? 1 : 1.5)
          , o = 0
          , l = 1
          , c = 1;
        switch (a) {
        case 0:
            o = t * e * 600 / 1e4;
            break;
        case 2:
            l = 1.15;
            break;
        case 3:
            l = 1.25;
            break;
        case 4:
            l = 1.35;
            break;
        case 5:
            l = 1.5
        }
        return a > 1 && 3 == i && (l += .1),
        n[0] * n[1] * n[2] < 2e4 && n[0] * n[1] / n[0] >= .75 && n[1] / n[0] < 2 && n[2] / n[1] < 4 && n[0] * n[1] < 150 && 2 == i && !isStd(n[0], n[1], n[2]) && (l += .1),
        Math.round(l * s * t * e * r / 1e6 - o) * (isStd(n[0], n[1], n[2]) ? 1 : c)
    }
    function getDate() {
        var t = new Date
          , e = t.getDate()
          , r = t.getMonth() + 1
          , a = t.getYear() + 1900;
        return (1 == (e + "").length ? "0" + e : e) + "." + (1 == (r + "").length ? "0" + r : r) + "." + a
    }
    function getRandomInt(t, e) {
        return Math.floor(Math.random() * (e - t)) + t
    }
    window.total = 0,
    window.volume = 0,
    $(document).ready(function() {
        top.document.title = "Гранитная фабрика Пантера / Расчет заказа",
        $(".calculateData").bind("click touchstart", tokenize),
        $(".exportData").bind("click touchstart", exportData),
        $("#order").focus(),
        (-1 != top.document.location.href.indexOf("#") || -1 != top.document.location.href.indexOf("?")) && $("#discount").parent().html('<input type="number" id="discount" class="form-control" style="width: 100%;" value="0">'),
        $("#discount").change(function() {
            var t = $("#discount");
            (-1 != t.val().indexOf(",") || -1 != t.val().indexOf(".")) && t.val(t.val().replace(/[,\.]/, ".")),
            isNaN(parseFloat(t.val())) && t.val(0),
            $("#grid").trigger("change")
        }),
        $("#pricesgrid").html(drawTable([{
            title: "Полировка",
            field: "t",
            width: "25%",
            "class": "col-xs-3"
        }, {
            title: "Стела",
            field: "s",
            width: "25%",
            "class": "col-xs-3"
        }, {
            title: "Подставка",
            field: "p",
            width: "25%",
            "class": "col-xs-3"
        }, {
            title: "Цветник",
            field: "c",
            width: "25%",
            "class": "col-xs-3"
        }], [{
            t: "1-стор.",
            s: "сайт",
            p: "сайт",
            c: "сайт"
        }, {
            t: "2-стор.",
            s: "+ 15 %",
            p: "+ 15 %",
            c: "+ 25 %"
        }, {
            t: "3-стор.",
            s: "+ 25 %",
            p: "+ 25 %",
            c: "+ 35 %"
        }, {
            t: "4-стор.",
            s: "+ 35 %",
            p: "+ 35 %",
            c: "+ 45 %"
        }, {
            t: "5-стор.",
            s: "+ 50 %",
            p: "+ 50 %",
            c: "+ 60 %"
        }])),
        $("#pricesgrid").find("thead").prepend('<tr><th colspan="4">Наценки на полировку изделий</th></tr>'),
        $("#prgrid").html(drawTable([{
            title: "Изделие",
            field: "t",
            "class": "col-xs-3"
        }, {
            title: "Кол-во",
            field: "a",
            "class": "col-xs-3"
        }, {
            title: "Наценка",
            field: "p",
            "class": "col-xs-3"
        }], [{
            t: "Стелы",
            a: "до 5 шт.",
            p: "20 %"
        }, {
            t: "Стелы",
            a: "до 10 шт.",
            p: "10 %"
        }, {
            t: "Стелы",
            a: "от 10 шт.",
            p: "0 %"
        }, {
            t: "Подставки, цветники",
            a: "до 10 шт.",
            p: "20 %"
        }, {
            t: "Подставки, цветники",
            a: "до 20 шт.",
            p: "10 %"
        }, {
            t: "Подставки, цветники",
            a: "от 20 шт.",
            p: "0 %"
        }])),
        $("#prgrid").find("thead").prepend('<tr><th colspan="3">Наценки на нестандарты</th></tr>'),
        autosize($("#order")),
        $(document).on("keydown", function(t) {
            10 != t.keyCode && 13 != t.keyCode || !t.ctrlKey || tokenize()
        }),
        $("#discount").bind("change", function() {
            drawOrderTable($("#priceListTable").data("data"))
        })
    });
    var std = [[[5, 8], 40, [60, 80]], [[5, 8], [50, 60], 100], [[5, 8], 60, 120], [[12, 15], [15, 20], [50, 60, 70]], [[5, 8], [8, 10], [50, 60, 70, 80, 100, 120]]]
      , semistd = [[[5, 8], "*", [80, 100, 120]]];
    $("#stdgrid").html(drawTable([{
        title: "Длина",
        field: "l",
        "class": "col-xs-4"
    }, {
        title: "Ширина",
        field: "w",
        "class": "col-xs-3"
    }, {
        title: "Толщина",
        field: "d",
        "class": "col-xs-2"
    }], std.map(function(t) {
        return {
            l: Array.isArray(t[2]) ? t[2].sort(function(t, e) {
                return e - t
            }).join(", ") : t[2],
            w: Array.isArray(t[1]) ? t[1].sort(function(t, e) {
                return e - t
            }).join(", ") : t[1],
            d: Array.isArray(t[0]) ? t[0].sort(function(t, e) {
                return e - t
            }).join(", ") : t[0]
        }
    }))),
    $("#stdgrid").find("thead").prepend('<tr><th colspan="4">Стандартные размеры, см</th></tr>');
    var stds = semistd.map(function(t) {
        return Array.isArray(t[0]) && t[0].sort(function(t, e) {
            return -t + e
        }),
        Array.isArray(t[1]) && t[1].sort(function(t, e) {
            return -t + e
        }),
        Array.isArray(t[2]) && t[2].sort(function(t, e) {
            return -t + e
        }),
        {
            lwd: "Размеры [" + (Array.isArray(t[2]) ? t[2].join(", ") : t[2]) + "] x [" + (Array.isArray(t[1]) ? t[1].join(", ") : t[1]) + "] x [" + (Array.isArray(t[0]) ? t[0].join(", ") : t[0]) + "] от 1 до 9 шт.",
            inc: "+" + skn0
        }
    });
    stds.push({
        lwd: "Нестандарты от 5 до 9 шт",
        inc: "+" + skn1
    }),
    stds.push({
        lwd: "Нестандарты от 2 до 4 шт",
        inc: "+" + skn2
    }),
    stds.push({
        lwd: "Нестандарты поштучно",
        inc: "+" + skn3
    }),
    stds.push({
        lwd: "Нестандарты от 0.5 м<sup>3</sup> или от 10 шт",
        inc: "+" + skn4
    }),
    stds.unshift({
        lwd: "<b>Нестандарты</b>",
        inc: "<b>Наценка</b>"
    });
    var tbl = drawTable([{
        title: "Размер изделия",
        field: "lwd"
    }, {
        title: "Наценка",
        field: "inc"
    }], stds);
    try {
        tbl = tbl.match(/<tbody>(.*)<\/tbody>/gi)[0].replace(/<\/?tbody>/gi, "").replace(/<tr><td/gi, '<tr><td colspan="2"'),
        $("#stdgrid").find("tbody").append(tbl)
    } catch (e) {}
    var inStd = function(t, e) {
        return Array.isArray(e) ? -1 != e.indexOf(t) : t == e || "*" == e
    }
      , isStd = function(t, e, r) {
        for (var a = getMin(t, e, r), n = 0; n < std.length; n++)
            if (inStd(a[0], std[n][0]) && inStd(a[1], std[n][1]) && inStd(a[2], std[n][2]))
                return !0;
        return !1
    }
      , isSemiStd = function(t, e, r) {
        for (var a = getMin(t, e, r), n = 0; n < semistd.length; n++)
            if (inStd(a[0], semistd[n][0]) && inStd(a[1], semistd[n][1]) && inStd(a[2], semistd[n][2]))
                return !0;
        return !1
    };
    $(".calcDate").html(getDate()),
    $(".calcNumber").html(getRandomInt(1e3, 9999) + "-" + getRandomInt(1e3, 9999)),
    $("#printStyle").html(kendo.support.mobileOS ? "@media print {#priceListTable *> td {line-height: 0.5;}}" : "#priceListTable *> td {line-height: 0.5;}"),
    kendo.support.mobileOS && $("body").append("<style>#priceListTable *> td { font-size: 0.9 em; } </style>"),
    $(window.applicationCache).bind("updateready", function() {
        top.location.reload()
    });
