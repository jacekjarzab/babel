import assert from "assert";
import OptionManager from "../lib/transformation/file/options/option-manager";
import Logger from "../lib/transformation/file/logger";
import path from "path";

suite("option-manager", () => {
  suite("memoisePluginContainer", () => {
    test("throws for babel 5 plugin", () => {
      return assert.throws(
        () => OptionManager.memoisePluginContainer(({ Plugin }) => new Plugin("object-assign", {})),
        /Babel 5 plugin is being run with Babel 6/
      );
    })
  });

  suite("mergeOptions", () => {
    test("throws for removed babel 5 options", () => {
      return assert.throws(
        () => {
          var opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            'randomOption': true
          });
        },
        /Unknown option: base.randomOption/
      );
    });
    test("throws for removed babel 5 options", () => {
      return assert.throws(
        () => {
          var opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            'auxiliaryComment': true,
            'blacklist': true
          });
        },
        /Using removed Babel 5 option: base.auxiliaryComment - Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`/
      );
    });
    test("throws for resolved but erroring preset", () => {
      return assert.throws(
        () => {
          var opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            'presets': [path.join(__dirname, "fixtures/option-manager/not-a-preset")]
          });
        },
        /While processing preset: .*option-manager(?:\/|\\\\)not-a-preset\.js/
      );
    });
  });
});
