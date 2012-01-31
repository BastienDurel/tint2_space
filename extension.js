
const Main = imports.ui.main;
const St = imports.gi.St;
const Lang = imports.lang;

function tint2_space() {
    this._init();
}

tint2_space.prototype = {
    _init : function() {
	let m = Main.layoutManager.monitors.length;
	this.actors = new Array(m);
	for (var i = 0; i < m; i++) {
	    this._configOne(i);
	}
        global.screen.connect('monitors-changed', Lang.bind(this,
                                                     this.relayout));
    },

    relayout: function() {
	global.log("relayout ...");
	for (var i = 0; i < this.actors.length; i++) {
	    global.log("relayout: " + i);
            let monitor = Main.layoutManager.monitors[i];
	    global.log("relayout -> " + monitor);

            let h = 31;
            this.actors[i].set_position(monitor.x, monitor.y+monitor.height-h);
            this.actors[i].set_size(100, 32);
	}
    },

    _configOne: function(i) {
	global.log("_configOne: " + i);
	this.actors[i] = new St.BoxLayout({ style_class: 'bottom-panel',
                                        name: 'bottomPanel' + i,
                                        reactive: true });
	this.actors[i]._delegate = this;
	Main.layoutManager.addChrome(this.actors[i], { affectsStruts: true });
	
        this.actors[i].connect('style-changed', Lang.bind(this, this.relayout));
    },

    deconfigure: function() {
	for (var i = 0; i < this.actors.length; i++) 
	    Main.layoutManager.removeChrome(tint2space.actors[i]);
    }
};

let tint2space = null;

function init(extensionMeta) {
}

function enable() {
    //Main.wm._reset();

    tint2space = new tint2_space();
    tint2space.relayout();
}

function disable() {

    //Main.wm._reset();

    if ( tint2space ) {
        tint2space.deconfigure();
        tint2space = null;
    }
}

