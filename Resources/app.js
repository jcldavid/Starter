var appWindow = Ti.UI.getCurrentWindow();


var doSomething = function() {
    //Do something!
}
var menu = Ti.UI.createMenu();
var mysql = Ti.Process.createProcess(['mysqld']);
var nginx = Ti.Process.createProcess(['sh', 'nginxd']);
var php = Ti.Process.createProcess(['php-cgi', '-b', 'localhost:9000']);
var stopped = true;
var services = {
  start: function() {
    mysql.launch();
    nginx.launch();
    php.launch();
  },
  stop: function() {
    mysql.terminate();
    nginx.terminate();
    php.terminate();
    Ti.Process.createProcess(['taskkill', '/im', 'nginx.exe', '/f']).launch();
  }
};

menu.appendItem(Ti.UI.createMenuItem('Start', function() {
  services.start();
  stopped = false;
}));
menu.appendItem(Ti.UI.createMenuItem('Stop', function() {
  services.stop();
  stopped = true;
}));
menu.addSeparatorItem();
menu.appendItem(Ti.UI.createMenuItem('Exit', function() {
  if ( ! stopped) {
    services.start();
  }
  Ti.App.exit();
}));

var tray = Ti.UI.addTray('default_app_logo.png');
tray.setMenu(menu);
tray.setHint('Starter');

//Creating a notification and displaying it.
// var notification = Ti.Notification.createNotification({
//     'title' : 'Notification from App',
//     'message' : 'Click here for updates!',
//     'timeout' : 10,
//     'callback' : doSomething,
//     'icon' : 'app://images/notificationIcon.png'
// });

// notification.show();

// Ti.UI.getMainWindow().showInspector();