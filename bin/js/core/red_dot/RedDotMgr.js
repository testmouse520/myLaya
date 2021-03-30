var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 */
var h5game;
(function (h5game) {
    /**
     * 红点管理类
     */
    var RedDotMgr = /** @class */ (function (_super) {
        __extends(RedDotMgr, _super);
        function RedDotMgr() {
            var _this = _super.call(this) || this;
            _this._objChild2Parents = {};
            _this._objParent2Childs = {};
            _this._objKeyValue = {};
            return _this;
            // this.initAllRelevance();
        }
        // public static get instance(): RedDotModule {
        // 	return super.ins() as RedDotModule;
        // }
        /**
         * 初始化键值关联
         * @param parentKey
         * @param childKeys
         */
        RedDotMgr.prototype.initKeyRelevance = function (parentKey, childKeys) {
            if (childKeys === void 0) { childKeys = []; }
            for (var i = 0; i < childKeys.length; i++) {
                var childKey = childKeys[i];
                this._objChild2Parents[childKey] = this._objChild2Parents[childKey] || [];
                if (this._objChild2Parents[childKey].indexOf(parentKey) < 0)
                    this._objChild2Parents[childKey].push(parentKey);
            }
            this._objParent2Childs[parentKey] = childKeys;
        };
        /**
         * 获取键值关联子节点
         * @param key
         */
        RedDotMgr.prototype.getParentChilds = function (key) {
            return this._objParent2Childs[key];
        };
        /**
         * @param key
         */
        RedDotMgr.prototype.getRedDotValue = function (key) {
            return this._objKeyValue[key] || 0;
        };
        /**
         * 注册红点
         * @param key
         * @param targetNode
         * @param args
         */
        RedDotMgr.prototype.registerRedDot = function (key, targetNode, args) {
            var showValue = (args && args.showValue) ? args.showValue : false;
            var positionX = (args && args.positionX) ? args.positionX : targetNode.width - RedDotMgr.RED_DOT_WIDTH;
            var positionY = (args && args.positionY) ? args.positionY : RedDotMgr.RED_DOT_HEGIHT / 2;
            var redDot = targetNode.getChildByName("RedDot");
            if (!redDot) {
                redDot = new h5game.RedDot();
                redDot.x = positionX;
                redDot.y = positionY;
                targetNode.addChild(redDot);
            }
            // 注册事件
            redDot.registerRedDot(key, showValue);
        };
        /**
         * 注销红点
         * @param pKey
         * @param targetNode
         */
        RedDotMgr.prototype.unregisterRedDot = function (targetNode) {
            // 注销事件
            var redDot = targetNode.getChildByName("RedDot");
            if (redDot) {
                redDot.unregisterRedDot();
            }
        };
        /**
         * 设置红点值
         * @param key
         * @param value
         */
        RedDotMgr.prototype.setRedDotValue = function (key, value) {
            if (key == null || value == null) {
                return;
            }
            value = Math.max(value, 0);
            var parentKeys = this._objChild2Parents[key];
            var oldValue = this.getRedDotValue(key);
            var newValue = value - oldValue;
            if (parentKeys && parentKeys.length > 0) {
                for (var i = 0, length_1 = parentKeys.length; i < length_1; i++) {
                    var parentKey = parentKeys[i];
                    var oldPVal = this.getRedDotValue(parentKey);
                    this.setRedDotValue(parentKey, oldPVal + newValue);
                }
            }
            this._objKeyValue[key] = value;
            var obj = { key: key };
            // 发送事件
            h5game.Global.evtMgr.dispatch(h5game.RedDotEvent.CHANGED, this, new h5game.RedDotEvent(obj), true);
        };
        /**
         * 重置红点
         */
        RedDotMgr.prototype.resetRedDot = function () {
            this._objKeyValue = {};
            // 发送事件
            h5game.Global.evtMgr.dispatch(h5game.RedDotEvent.RESET, this, new h5game.RedDotEvent(), true);
        };
        /** 红点宽度 */
        RedDotMgr.RED_DOT_WIDTH = 30;
        /** 红点高度 */
        RedDotMgr.RED_DOT_HEGIHT = 30;
        return RedDotMgr;
    }(h5game.BaseClass));
    h5game.RedDotMgr = RedDotMgr;
})(h5game || (h5game = {}));
//# sourceMappingURL=RedDotMgr.js.map