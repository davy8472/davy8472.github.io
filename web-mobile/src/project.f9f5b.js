require=function a(o,c,r){function h(t,e){if(!c[t]){if(!o[t]){var s="function"==typeof require&&require;if(!e&&s)return s(t,!0);if(u)return u(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=c[t]={exports:{}};o[t][0].call(i.exports,function(e){return h(o[t][1][e]||e)},i,i.exports,a,o,c,r)}return c[t].exports}for(var u="function"==typeof require&&require,e=0;e<r.length;e++)h(r[e]);return h}({bridge:[function(e,t,s){"use strict";cc._RF.push(t,"d98200B1qhM+rn4f8zgr4Xk","bridge"),cc.Class({extends:cc.Component,properties:{},start:function(){},getLen:function(){var e=0;return this.node&&(e=parseInt(this.node.getContentSize().height*this.node.getScaleY())),e},showWrong:function(){this.node.color=cc.Color.BLACK}}),cc._RF.pop()},{}],character:[function(e,t,s){"use strict";cc._RF.push(t,"76cc2oQQyZHYa7kohuaulME","character"),cc.Class({extends:cc.Component,properties:{},start:function(){},setGameEngine:function(e){this.m_gameEngine=e},moveRight:function(e,t){var s=cc.moveBy(1,cc.p(e-POSX_BRI[t],0)),n=cc.callFunc(function(){this.m_gameEngine.newRound()},this),i=cc.sequence(s,n);this.node.runAction(i)},moveWrong:function(e){var t=cc.moveBy(1,cc.p(e,0)),s=cc.moveBy(2,cc.p(0,-500)),n=cc.callFunc(function(){this.m_CharacterAni=this.node.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay),this.m_CharacterAni.playAnimation("stand")},this),i=cc.spawn(n,s),a=cc.callFunc(function(){this.m_gameEngine.showEndView()},this),o=cc.sequence(t,i,a);this.node.runAction(o)}}),cc._RF.pop()},{}],endLayer:[function(e,t,s){"use strict";cc._RF.push(t,"f9eb0dXP7VEgZg0qKdlZR2V","endLayer"),cc.Class({extends:cc.Component,properties:{m_Show:cc.Label},ctor:function(){this._showValue=0},onload:function(){},start:function(){},setData:function(e){this._showValue=e.score,this.m_Show.string=this._showValue}}),cc._RF.pop()},{}],gameEngineBase:[function(e,t,s){"use strict";cc._RF.push(t,"25a06ILP8tMeJQ2sqsV+sQO","gameEngineBase");var n=e("rightStatus"),i=e("wrongStatus"),a=e("startStatus"),o=e("homeStatus"),c=e("pauseStatus"),r=e("newRoundStatus");cc.Class({extends:cc.Component,properties:{m_GameView:cc.Node,m_LanuchView:cc.Node,m_RankView:cc.Node,m_Home:cc.Node},ctor:function(){this.initData(),this._statusArr=new Array},initData:function(){this.m_bPause=!1,this.m_CurStatus=null},onLoad:function(){cc.sys.isNative&&(window.io=SocketIO),this.m_GameView=this.m_GameView.getComponent("gameView"),this.m_LanuchView=this.m_LanuchView.getComponent("lanuchView"),this.m_RankView=this.m_RankView.getComponent("rankView"),this.m_GameView.setGameEngine(this),this.m_LanuchView.setGameEngine(this),this.m_RankView.setGameEngine(this),this.m_StartStatus=new a,this.m_RightStatus=new n,this.m_WrongStatus=new i,this.m_HomeStatus=new o,this.m_PauseStatus=new c,this.m_NewRoundStatus=new r,this._statusArr[STATUS.START]=this.m_StartStatus,this._statusArr[STATUS.RIGHT]=this.m_RightStatus,this._statusArr[STATUS.WRONG]=this.m_WrongStatus,this._statusArr[STATUS.HOME]=this.m_HomeStatus,this._statusArr[STATUS.PAUSE]=this.m_PauseStatus,this._statusArr[STATUS.NEWROUND]=this.m_NewRoundStatus,this.m_CurStatus=this._statusArr[STATUS.HOME],this._statusArr.forEach(function(e){e.setGameEngine(this)},this),this.setLanchuViewShow(!0),this.setGameViewShow(!1)},addNode:function(e){this.m_GameView.addChild(e)},right:function(){this.setGameStatus(STATUS.RIGHT)},wrong:function(e){this.setGameStatus(STATUS.WRONG)},resume:function(){this.setGameStatus(STATUS.RIGHT)},resumeEx:function(){this.m_bPause=!1,this.m_GameView.setPauseLayerShow(!1)},share:function(){var t=this;wx.shareAppMessage({title:"经典小游戏始终好玩如初，来吧！一起来回味吧！",query:"type=heart",imageUrl:"http://47.95.230.50:88/shareImg.png",success:function(e){console.log("转发成功!!!"),this.reward()},fail:function(e){console.log("转发失败!!!"),t.m_GameView.setPauseLayerShow(!0,3)}})},shareEx:function(){var t=this;wx.shareAppMessage({title:"经典小游戏始终好玩如初，来吧！一起来回味吧！",imageUrl:"http://47.95.230.50:88/shareImg.png",query:"type=heart&url="+gloablUserIfo.url+"&name="+gloablUserIfo.name,success:function(e){e.shareTickets&&e.shareTickets[0]?(t.reward(),console.log("转发成功!!!"),t.m_GameView.setPauseLayerShow(!0,2)):t.m_GameView.setPauseLayerShow(!0,3)},fail:function(e){console.log("转发失败!!!"),t.m_GameView.setPauseLayerShow(!0,3)}})},home:function(){this.setGameStatus(STATUS.HOME)},music:function(){},restart:function(){this.setGameStatus(STATUS.START)},reward:function(){this.m_HeartSum=2,this.m_GameView.setHart(this.m_HeartSum)},rewardEx:function(){console.log("reward ok")},process:function(){this.m_CurStatus.enterStatus()},gameEnd:function(){this.m_bPause=!0,this.m_GameView.setEndLayerShow(!0),this.setRankViewShow(!0)},gamePause:function(){this.m_bPause=!0,this.m_GameView.setPauseLayerShow(!0,1)},gameStart:function(){},setGameStatus:function(e){console.log("状态:"+STATUS_NAME[e]),this.m_CurStatus&&this.m_CurStatus.exitStatus(),this.m_CurStatus=this._statusArr[e],this.process()},setLanchuViewShow:function(e){this.m_LanuchView.node.active=e},setGameViewShow:function(e){this.m_GameView.node.active=e},setRankViewShow:function(e){this.setHomeShow(e),this.m_RankView.node.active=e,this.m_RankView.hideAll()},setHomeShow:function(e){this.m_Home.active=e},initGame:function(){this.initData(),this.unscheduleAllCallbacks(),this.setRankViewShow(!1)},InitEnd:function(){this.m_GameView.setEndLayerShow(!1),this.setRankViewShow(!1)},InitPause:function(){this.m_bPause=!1,this.m_GameView.setPauseLayerShow(!1)}}),cc._RF.pop()},{homeStatus:"homeStatus",newRoundStatus:"newRoundStatus",pauseStatus:"pauseStatus",rightStatus:"rightStatus",startStatus:"startStatus",wrongStatus:"wrongStatus"}],gameEngine:[function(e,t,s){"use strict";cc._RF.push(t,"f029dAeLf1LtLFZ6TlcFXK9","gameEngine");var n=e("gameEngineBase");cc.Class({extends:n,properties:{m_Character:cc.Node,m_MoveArr:{default:[],type:cc.Node},m_OtherMoveArr:{default:[],type:cc.Node}},ctor:function(){this.m_bReady=!0,this.m_Bridge=null,this.m_Table=null},onLoad:function(){this._super(),this.m_TableMgr=this.m_GameView.m_TableLayer.getComponent("tableMgr"),this.m_CharacterAni=this.m_Character.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay),this.m_CharacterAni.playAnimation("walk"),this.m_Character=this.m_Character.getComponent("character"),this.m_Character.setGameEngine(this),this.m_MoveArr.push(this.m_Character.node)},initMoveArray:function(){for(var e=0;e<this.m_MoveArr.length;e++){this.m_MoveArr[e].isDestroy&&this.m_MoveArr.splice(e,1)}},gameRight:function(){var e=this.m_TableMgr.getTableType(),t=this.m_Table.node.getPosition().x,s=cc.rotateBy(BRI_ACTION_TIME,90),n=cc.callFunc(function(){this.m_Character.moveRight(t-this.m_Character.node.getPosition().x,e)},this),i=cc.sequence(s,n);this.m_Bridge.node.runAction(i)},gameEnd:function(){this.m_Bridge.showWrong(),this.len_bri=this.m_Bridge.getLen();var e=cc.rotateBy(BRI_ACTION_TIME,90),t=cc.callFunc(function(){this.m_Character.moveWrong(this.len_bri+POX_C)},this),s=cc.sequence(e,t);this.m_Bridge.node.runAction(s)},showEndView:function(){console.log("结束界面待开发！！！")},check:function(){if(this.len_bri=this.m_Bridge.getLen(),this.len_bri){this.m_bReady=!1;this.m_Table.node.getPosition().x;var e=this.getNeedDis(this.m_Bridge.node.getPosition().x),t=this.getNeedPerfectDis(this.m_Bridge.node.getPosition().x);this.len_bri>e[0]&&this.len_bri<e[1]?(this.right(),this.len_bri>t[0]&&this.len_bri<t[1]&&this.m_GameView.showPerfect()):this.wrong()}},getNeedDis:function(){var e=this.m_Table.node.getPosition().x,t=this.m_Bridge.node.getPosition().x;return[e-t-CONTENT_X[this.m_Table.m_type]/2,e-t+CONTENT_X[this.m_Table.m_type]/2]},getNeedPerfectDis:function(){var e=this.m_Table.node.getPosition().x,t=this.m_Bridge.node.getPosition().x;return[e-t-10,e-t+10]},moveBg:function(){this.initMoveArray(),this.m_MoveArr.forEach(function(e){e&&this.moveItem(e)},this)},moveItem:function(e){var n=this,t=this.m_LastTable.node.getPosition().x-START_X,s=cc.moveBy(MOVE_TIME,cc.p(-t,0)),i=cc.callFunc(function(){if(this.getPosition().x<MIN_X){var e=cc.fadeOut(FADE_TIME),t=cc.callFunc(function(){"New Sprite(Splash)"==this.name&&n.scheduleOnce(function(){n.m_bReady=!0},.1),this.destroy(),this.isDestroy=!0},this),s=cc.sequence(e,t);this.runAction(s)}},e),a=cc.sequence(s,i);e.runAction(a)},createBridge:function(){this.m_TableMgr.getTableType();var e=cc.p(this.m_Character.node.getPosition().x+POX_C,POSY_BRI);this.m_Bridge=this.m_GameView.createBridge(e),this.m_MoveArr.push(this.m_Bridge.node)},createTable:function(){if(this.m_Table&&(this.m_LastTable=this.m_Table),this.m_Table=this.m_TableMgr.createItem(),this.m_LastTable){var e=-START_X+this.m_LastTable.node.getPosition().x,t=this.m_Table.node.getPosition().x;this.m_Table.node.setPositionX(e+t)}this.m_MoveArr.push(this.m_Table.node)},newRound:function(){this.setGameStatus(STATUS.NEWROUND)},isReady:function(){return this.m_bReady}}),cc._RF.pop()},{gameEngineBase:"gameEngineBase"}],gameViewBase:[function(e,t,s){"use strict";cc._RF.push(t,"68003xZzVdPAKVOrdQ8PHUd","gameViewBase"),cc.Class({extends:cc.Component,properties:{m_PauseView:cc.Node,m_EndView:cc.Node},onLoad:function(){this.m_EndView=this.m_EndView.getComponent("endLayer"),this.m_PauseView=this.m_PauseView.getComponent("pauseLayer")},setGameEngine:function(e){this.m_gameEngine=e},onClick_home:function(){this.m_gameEngine.home()},onClick_music:function(){this.m_gameEngine.music()},onClick_restart:function(){this.m_gameEngine.restart()},onClick_share:function(){this.m_gameEngine.share()},onClick_shareHeart:function(){this.m_gameEngine.shareEx()},onClick_resume:function(){this.m_gameEngine.resume()},onClick_resumeEx:function(){this.m_gameEngine.resumeEx()},setEndLayerShow:function(e){this.m_EndView.node.active=e},setPauseLayerShow:function(e,t){this.m_PauseView.node.active=e,this.m_PauseView.setShowType(t)},setPauseLayerData:function(e){this.m_PauseView.setData(e)},setEndLayerData:function(e){this.m_EndView.setData(e)}}),cc._RF.pop()},{}],gameView:[function(e,t,s){"use strict";cc._RF.push(t,"4bcf7Ii0IVH7qBloK1m0N2U","gameView");var n=e("gameViewBase");cc.Class({extends:n,properties:{m_TableLayer:cc.Node,m_BridgeItem:cc.Prefab,m_Perfect:cc.Node},ctor:function(){this.m_enable=!0,this.m_Vary=!1},onLoad:function(){this._super();var t=this;this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){t.m_enable&&t.OnTouchMove(e)},this),this.node.on(cc.Node.EventType.TOUCH_END,function(e){t.m_enable&&t.OnTouchEnd(e)},this),this.node.on(cc.Node.EventType.TOUCH_START,function(e){t.m_enable&&t.OnTouchStart(e)},this)},OnTouchStart:function(){this.m_gameEngine.isReady()&&(this.m_gameEngine.createBridge(),this.schedule(this.rise,.01))},OnTouchMove:function(){},OnTouchEnd:function(){this.m_gameEngine.isReady()&&(this.unschedule(this.rise),this.m_gameEngine.check())},createBridge:function(e){var t=cc.instantiate(this.m_BridgeItem);return t.setPosition(e.x,e.y),this.node.addChild(t),this.m_Bridge=t,this.m_Bridge.getComponent("bridge")},rise:function(e){this.m_Bridge.setScaleY(this.m_Bridge.getScaleY()+12*e)},getBirdge:function(){return this.m_Bridge.getComponent("bridge")},showPerfect:function(){var e=cc.fadeIn(1),t=cc.fadeOut(.5),s=cc.sequence(e,t);this.m_Perfect.runAction(s)}}),cc._RF.pop()},{gameViewBase:"gameViewBase"}],homeStatus:[function(e,t,s){"use strict";cc._RF.push(t,"110aakO9JhPKJIaiI79IOKD","homeStatus");var n=e("statusModel");cc.Class({extends:n,enterStatus:function(){this.m_gameEngine.setLanchuViewShow(!0),this.m_gameEngine.setGameViewShow(!1),this.m_gameEngine.initGame()}}),cc._RF.pop()},{statusModel:"statusModel"}],lanuchView:[function(e,t,s){"use strict";cc._RF.push(t,"777f7o/cehFVprJQSQqxBSf","lanuchView"),window.g_UserInfo=0,cc.Class({extends:cc.Component,properties:{m_RewardLayer:cc.Node},getUserData:function(e,t){wx.getUserInfo({success:function(e){var t=e.userInfo,s=(g_UserInfo=t).nickName,n=t.avatarUrl;t.gender,t.province,t.city,t.country;gloablUserIfo.url=n,gloablUserIfo.name=s,console.log("avatarUrl"+n),console.log("nickName"+s),wx.login({success:function(e){console.log("loginCode.code"+e.code),wx.request({url:"https://wxxyx.2828.net/gameApi.php",data:{type:"login",appid:"wx00673a34ccefc48d",code:e.code,userinfo:JSON.stringify(g_UserInfo)},success:function(e){console.log(e),gloablUserIfo.openid=e.data.data.openid,console.log("获取openid"+gloablUserIfo.openid)},method:"POST",header:{"content-type":"application/x-www-form-urlencoded"}})}})}})},onLoad:function(){if(!DEBUG){this.getUserData();var s=this,t=wx.getLaunchOptionsSync();console.log("LaunchOption"),console.log(t),1044==t.scene&&"heart"==t.query.type&&(s.setRewardLayerShow(!0),s.m_gameEngine.reward(),cc.sys.localStorage.setItem("bReward",1),console.log("用户信息"),console.log(t.query.url),console.log(t.query.name),s.m_RewardLayer.getComponent("rewardLayer").setHead({url:t.query.url,name:t.query.name})),wx.onShow(function(e){console.log("onShow"),console.log(e),1044==e.scene&&"heart"==e.query.type&&(s.setRewardLayerShow(!0),s.m_gameEngine.reward(),cc.sys.localStorage.setItem("bReward",1),console.log("用户信息"),console.log(t.query.url),console.log(t.query.name),s.m_RewardLayer.getComponent("rewardLayer").setHead({url:t.query.url,name:t.query.name}))}),wx.updateShareMenu({withShareTicket:!0,success:function(e){console.log("withShareTicket true")}}),wx.showShareMenu&&(wx.showShareMenu({withShareTicket:!0,success:function(e){console.log("showShareMenu true")},fail:function(e){console.log(e)}}),wx.onShareAppMessage(function(e){var t=!1;return s.m_gameEngine.m_CurStatus!=s.m_gameEngine.m_HomeStatus&&(t=!0),t&&(console.log("点击转发的时候就设置了"),s.m_gameEngine.m_GameView.setPauseLayerShow(!0,3)),{title:"不怕，就来PK！",imageUrl:"http://47.95.230.50:88/shareImg.png",query:"type=heart&url="+gloablUserIfo.url+"&name="+gloablUserIfo.name,success:function(e){e.shareTickets&&e.shareTickets[0]?(console.log("转发成功!!!"),t&&(s.m_gameEngine.reward(),s.m_gameEngine.m_GameView.setPauseLayerShow(!0,2))):t&&s.m_gameEngine.m_GameView.setPauseLayerShow(!0,3)},fail:function(e){console.log("转发失败!!!"),t&&s.m_gameEngine.m_GameView.setPauseLayerShow(!0,3)}}}))}},share:function(){wx.shareAppMessage({title:"不怕，就来PK！",imageUrl:"http://47.95.230.50:88/shareImg.png",query:"type=heart&url="+gloablUserIfo.url+"&name="+gloablUserIfo.name,success:function(e){e.shareTickets&&e.shareTickets[0]?(console.log("转发成功!!!"),bHome&&(self.m_gameEngine.reward(),self.m_gameEngine.m_GameView.setPauseLayerShow(!0,2))):bHome&&self.m_gameEngine.m_GameView.setPauseLayerShow(!0,3)},fail:function(e){console.log("转发失败!!!"),bHome&&self.m_gameEngine.m_GameView.setPauseLayerShow(!0,3)}})},setRewardLayerShow:function(e){(this.m_RewardLayer.active=e)?console.log("this.m_StartBtn.hide"):console.log("this.m_StartBtn.show")},start:function(){this._isShow=!1,this.tex=new cc.Texture2D},setGameEngine:function(e){this.m_gameEngine=e},onClick_start:function(){this.m_gameEngine.setGameStatus(STATUS.START)},onClick_qun_rank:function(){this.m_gameEngine.m_RankView.setShowStatus(RANK.QUN)},onClick_Rank:function(){this.m_gameEngine.m_RankView.setShowStatus(RANK.FRIEND)},onClick_image:function(){wx.previewImage({urls:["http://47.95.230.50:88/otherGame1.png"],success:function(){console.log("ok")},fail:function(){console.log("fail")},complete:function(){console.info("点击图片了")}})},onClick_Hide:function(){this.setRewardLayerShow(!1)}}),cc._RF.pop()},{}],newRoundStatus:[function(e,t,s){"use strict";cc._RF.push(t,"94ba8aeJ0NL1JYI/R8lCOrf","newRoundStatus");var n=e("statusModel");cc.Class({extends:n,enterStatus:function(){this.m_gameEngine.createTable(),this.m_gameEngine.moveBg()}}),cc._RF.pop()},{statusModel:"statusModel"}],otherGameView:[function(e,t,s){"use strict";cc._RF.push(t,"18084d1dFZLj7EKbuUPFwNT","otherGameView");var n=e("gameViewBase");cc.Class({extends:n,properties:{m_TableLayer:cc.Node,m_BridgeItem:cc.Prefab},ctor:function(){this.m_enable=!0,this.m_Vary=!1},onLoad:function(){this._super();var t=this;this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){t.m_enable&&t.OnTouchMove(e)},this),this.node.on(cc.Node.EventType.TOUCH_END,function(e){t.m_enable&&t.OnTouchEnd(e)},this),this.node.on(cc.Node.EventType.TOUCH_START,function(e){t.m_enable&&(t.m_gameEngine.createBridge(),t.OnTouchStart(e))},this)},OnTouchStart:function(){this.schedule(this.rise,.01)},OnTouchMove:function(){},OnTouchEnd:function(){this.unschedule(this.rise),this.m_gameEngine.check()},createBridge:function(e){var t=cc.instantiate(this.m_BridgeItem);return t.setPosition(e.x,e.y),this.node.addChild(t),this.m_Bridge=t,this.m_Bridge.getComponent("bridge")},rise:function(e){this.m_Bridge.setScaleY(this.m_Bridge.getScaleY()+10*e)},getBirdge:function(){return this.m_Bridge.getComponent("bridge")}}),cc._RF.pop()},{gameViewBase:"gameViewBase"}],pauseLayer:[function(e,t,s){"use strict";cc._RF.push(t,"ee581L7JdFFtq+uKSuqyJ9S","pauseLayer"),cc.Class({extends:cc.Component,properties:{m_Score:cc.Label,m_HeartTime:cc.Label},start:function(){},setData:function(e){this.m_Score.string=e.score,this.m_HeartTime.string=e.heart},setShowType:function(e){1==e?(this.node.getChildByName("show1").active=!0,this.node.getChildByName("show2").active=!1,this.node.getChildByName("show3").active=!1):2==e?(this.node.getChildByName("show1").active=!1,this.node.getChildByName("show2").active=!0,this.node.getChildByName("show3").active=!1):3==e&&(this.node.getChildByName("show1").active=!1,this.node.getChildByName("show2").active=!1,this.node.getChildByName("show3").active=!0)}}),cc._RF.pop()},{}],pauseStatus:[function(e,t,s){"use strict";cc._RF.push(t,"b6021axFpNMQqByJ8B78UXY","pauseStatus");var n=e("statusModel");cc.Class({extends:n,enterStatus:function(){this.m_gameEngine.gamePause()},exitStatus:function(){this.m_gameEngine.InitPause()}}),cc._RF.pop()},{statusModel:"statusModel"}],rankView:[function(e,t,s){"use strict";cc._RF.push(t,"b3257y6efxOxqmaoASNKERY","rankView"),cc.Class({extends:cc.Component,properties:{m_Notouch:cc.Node},start:function(){this._isShow=!1,this.tex=new cc.Texture2D},setGameEngine:function(e){this.m_gameEngine=e},_updaetSubDomainCanvas:function(){this.tex&&(this.tex.initWithElement(sharedCanvas),this.tex.handleLoadedTexture(),this.node.getChildByName("showView").getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(this.tex))},update:function(){DEBUG||this._updaetSubDomainCanvas()},reset:function(){DEBUG||wx.postMessage({message:"HIDE_ALL"})},setShowStatus:function(e){if(!DEBUG){if(DEBUG)return;wx.postMessage({message:"USER_INFO",userInfo:{openid:gloablUserIfo.openid,session_key:gloablUserIfo.session_key}}),e==RANK.QUN?this.showQunLayer():e==RANK.END?this.showEndLayer():e==RANK.FRIEND&&this.showRankLayer()}},showEndLayer:function(){var e=this.m_gameEngine.m_wGameScore;e||(e=0),this.m_Notouch.active=!1,this.node.getChildByName("hide").active=!1,DEBUG||wx.postMessage&&wx.postMessage({message:"SHOW_END",scoreData:{score:e}})},hideEndLayer:function(){DEBUG||wx.postMessage&&wx.postMessage({message:"HIDE_END"})},hideAll:function(){DEBUG||wx.postMessage&&wx.postMessage({message:"HIDE_ALL"})},showQunLayer:function(){this.m_Notouch.active=!0,this.node.getChildByName("hide").active=!0;if(!DEBUG){wx.updateShareMenu&&wx.updateShareMenu({withShareTicket:!0,success:function(e){console.log("withShareTicket true！！！！！！")}});var t=this;wx.shareAppMessage({title:"经典小游戏始终好玩如初，来吧！一起来回味吧！",imageUrl:"http://47.95.230.50:88/shareImg.png",success:function(e){console.log("转发成功!!!"),console.log(e),wx.postMessage({message:"SHOW_QUN",shareData:{shareTicket:e.shareTickets[0]}}),t.m_gameEngine.setRankViewShow(!0)},fail:function(e){console.log("转发失败!!!")}})}},showRankLayer:function(){this.m_Notouch.active=!0,this.node.getChildByName("hide").active=!0,DEBUG||(wx.postMessage({message:"SHOW_FRIEND"}),this.m_gameEngine.setRankViewShow(!0))},onClickClose:function(){this.m_gameEngine.m_LanuchView.node.active,this.m_gameEngine.m_CurStatus==this.m_gameEngine.m_WrongStatus?(this.hideAll(),this.showEndLayer()):this.m_gameEngine.setRankViewShow(!1)},onClick_next:function(){DEBUG||wx.postMessage({message:"NEXT"})},onClick_last:function(){DEBUG||wx.postMessage({message:"LAST"})}}),cc._RF.pop()},{}],rewardLayer:[function(e,t,s){"use strict";cc._RF.push(t,"b605dizUw1B2ZNldAdeL9R3","rewardLayer"),cc.Class({extends:cc.Component,properties:{m_HeadImg:cc.Sprite,m_UserName:cc.Label},start:function(){},setHead:function(e){var t=e.url+"?aaa=aa.jpg",s=this;cc.loader.load(t,function(e,t){s.m_HeadImg.spriteFrame=new cc.SpriteFrame(t)}),this.m_UserName.string=e.name}}),cc._RF.pop()},{}],rightStatus:[function(e,t,s){"use strict";cc._RF.push(t,"83be8x68NJGs7R3mLf6x51+","rightStatus");var n=e("statusModel");cc.Class({extends:n,enterStatus:function(){this.m_gameEngine.gameRight()}}),cc._RF.pop()},{statusModel:"statusModel"}],showNode:[function(e,t,s){"use strict";cc._RF.push(t,"da415a1YjJFvZb0a9oGHrxR","showNode"),cc.Class({extends:cc.Component,properties:{m_Show:cc.Label},ctor:function(){this._showValue=0},onload:function(){},start:function(){},setShow:function(e){this._showValue=e,this.m_Show.string=this._showValue}}),cc._RF.pop()},{}],startStatus:[function(e,t,s){"use strict";cc._RF.push(t,"dbad3zsnOVCyKRAQuSnaos+","startStatus");var n=e("statusModel");cc.Class({extends:n,enterStatus:function(){this.m_gameEngine.initGame(),this.m_gameEngine.setLanchuViewShow(!1),this.m_gameEngine.setGameViewShow(!0),this.m_gameEngine.createTable()}}),cc._RF.pop()},{statusModel:"statusModel"}],statusModel:[function(e,t,s){"use strict";cc._RF.push(t,"aa5dabZk3FK5IK7dmMLEVY6","statusModel"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){},enterStatus:function(){},exitStatus:function(){},setGameEngine:function(e){this.m_gameEngine=e}}),cc._RF.pop()},{}],tableItem:[function(e,t,s){"use strict";cc._RF.push(t,"b8f9cBVFolH545ygZOvXzqA","tableItem"),cc.Class({extends:cc.Component,properties:{m_TypeArr:{default:[],type:cc.Node}},ctor:function(){this.m_type=0},setType:function(e){this.m_type=e;for(var t=0;t<this.m_TypeArr.length;t++)this.m_TypeArr[t].active=this.m_type==t}}),cc._RF.pop()},{}],tableMgr:[function(e,t,s){"use strict";cc._RF.push(t,"c5795W5DNZF0YRuQxkmcizO","tableMgr"),cc.Class({extends:cc.Component,properties:{m_TableItem:cc.Prefab},onLoad:function(){this.m_PosX=null,this.m_type=null},setGameEngine:function(e){this.m_gameEngine=e},createItem:function(){var e=START_X+200+g_GameLogic.GetRandomNum(100-START_X),t=cc.instantiate(this.m_TableItem);t.setPosition(e,-479),this.node.addChild(t);var s=g_GameLogic.GetRandomNum(2);this.m_type=0<s?0:1<s?1:2;var n=t.getComponent("tableItem");return n.setType(this.m_type),this.m_PosX=e,n},getNeedDis:function(e){return[this.m_PosX-e-CONTENT_X[this.m_type]/2,this.m_PosX-e+CONTENT_X[this.m_type]/2]},getTableType:function(){return this.m_type}}),cc._RF.pop()},{}],wrongStatus:[function(e,t,s){"use strict";cc._RF.push(t,"43a5dBj8plI57nKbdPE1yXR","wrongStatus");var n=e("statusModel");cc.Class({extends:n,enterStatus:function(){this.m_gameEngine.gameEnd()},exitStatus:function(){this.m_gameEngine.InitEnd()}}),cc._RF.pop()},{statusModel:"statusModel"}]},{},["gameEngineBase","gameViewBase","gameEngine","bridge","character","endLayer","pauseLayer","rewardLayer","showNode","tableItem","homeStatus","newRoundStatus","pauseStatus","rightStatus","startStatus","statusModel","wrongStatus","gameView","lanuchView","otherGameView","rankView","tableMgr"]);