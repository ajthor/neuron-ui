'use strict';
import test from 'ava';
import {Application} from 'spectron';

import path from 'path';

test.beforeEach(t => {

	t.context.app = new Application({
    args: [`${path.dirname(__dirname)}`],
		path: '../node_modules/.bin/electron'
	});

	return t.context.app.start();

});

test.afterEach(t => {
	return t.context.app.stop();
});

test('window is visible', t => {
  const app = t.context.app;

  return app.client.waitUntilWindowLoaded()
    .browserWindow.isVisible().then(visible => {
			t.true(visible);
		});
});
