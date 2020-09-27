// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// require('../src/views/js/viewerCesiumNavigationMixin.js')

require('../src/views/js/khr_error.js')
var cesiumInit = require('../src/views/js/cesiumInit.js')
var wmtsLayer = require('../src/views/js/wmtsLayer.js')
var objModelOP = require('../src/views/js/objModelOP.js')
var cesiumMoveTo = require('../src/views/js/cesiumMoveTo.js')
var sun = require('../src/views/js/sun.js')
var measure = require('../src/views/js/measure.js')
var showAttr = require('../src/views/js/showAttr.js')
var blockPlan = require('../src/views/js/blockPlan.js')
var loadGeojson = require('../src/views/js/loadGeojson.js')


    // var terrain = new Cesium.CesiumTerrainProvider({
    //     // url: Cesium.IonResource.fromAssetId(1)
    //     // url: "./img/WorldTerrain", // 默认立体地表
    //     //url:"http://www.sunwaywh.top/img/WorldTerrain"
    //     url: "http://127.0.0.1:80/WorldTerrain",
    //     minimumLevel: 0,
    //     maximumLevel: 5
    // });

    var terrain = new Cesium.EllipsoidTerrainProvider({});

    var options = {
        initPos: Cesium.Cartesian3.fromDegrees(111.0, 34.4, 50000),
        baseLayerPicker: false, //是否显示图层选择控件
        animation: false,       //是否显示动画控件
        homeButton: false,       //是否显示home键
        geocoder: false,         //是否显示地名查找控件        如果设置为true，则无法查询
        fullscreenButton: true,     // 是否显示全屏按钮
        vrButton: true,             // 是否显示VR按钮
        timeline: false,        //是否显示时间线控件
        //        scene3DOnly: true,     //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        infoBox: false,         //是否显示点击要素之后显示的信息
        sceneModePicker: false,  //是否显示投影方式控件  三维/二维
        navigationInstructionsInitiallyVisible: false,
        navigationHelpButton: false,     //是否显示帮助信息控件
        selectionIndicator: false,//是否显示指示器组件
        mapProjection: new Cesium.WebMercatorProjection(),
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //     credit: new Cesium.Credit("本地地图服务"),
        //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
        //     fileExtension: 'jpg',
        //     minimumLevel: 1,
        //     // url: 'http://127.0.0.1:80/googleMapXinAn/{z}/{x}/{y}.jpg',
        //     // maximumLevel: 18
        //     url: 'http://www.sunwaywh.top/img/googleMap/{z}/{x}/{y}.jpg',
        //     maximumLevel: 9
        // }),
        mapType:'tdt',

        terrainProvider: terrain,
        clock: new Cesium.Clock()
    }

    var CViewer = cesiumInit.cesiumInit(options);
    // console.log("after cesiumInit", layer)

    objModelOP.setViewer(CViewer)
    measure.setViewer(CViewer)

    setShowViewPos(CViewer); // for show mouse coor

    CViewer.extend(Cesium.viewerCesiumNavigationMixin, {});

    /////////////////////////////////////////////////////////////////////////////////////////

    function clearCeLiangBtnBackgroundColor(){
        var curBtnBackgroundColor = '#cd853f', bg='unset'
        var btns = ['kongjianCeDianBtn', 'tdCeJuBtn', 'kongjianCeJuBtn', 'gaoduBtn', 'sanjiaoCeJuBtn', 'fangLiangBtn']
		for( var i=0; i<btns.length; i++){
			var btn = document.getElementById(btns[i])
			btn && (btn.children[0].style.backgroundColor = bg)
        }
    }
    
    ////////////////////////////////////////////////////////////
    

    // 适用于 geojsonBtnGroup osgbModelBtnGroup objModelBtnGroup blockPlanBtnGroup
    // objMoveBtnPan sunPane settingPane
    var showGeoJSONPan = -1
    var osgbModelBtnPan = -1
    var objModelBtnPan = -1
    var blockPlanBtnPan = -1
    var objMoveBtnPan = -1
    var sunBtnPan = -1
    var settingBtnPan = -1
    function openPane(btnId, content, title, exitFunc, w, h){
            
        return layer.open({
                title: title,
                type: 1,
                offset:  ['10px', '60px'],
                area: ((w)? [w + 'px', h + 'px']:'auto'),
                resize: false,  //按钮表格效果不好，关了算了
                closeBtn: 1 ,   // 是否显示关闭按钮
                shadeClose: true,
                shade: false,
                skin: 'layer-ext-fo',
                maxmin: false,
                style:"min-width: 10px",
                content: content, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                success: function(lay, index) {
                    //layer.iframeAuto(index); //加载完成后再自适应一下高度。不用也没问题，反而导致初始resize按钮位置不对
                },
                end: function () {
                    console.log("end")
                    document.getElementById(btnId).children[0].style.backgroundColor = 'unset'
                    if( exitFunc && typeof(exitFunc)==="function"){
                        exitFunc()
                    }
                }
            });
    };


    ////////////////////////////////////////////////////////////
    
    // 初始化总规图按钮列表
    layui.config({
        base: 'static/js/'
        , extend: 'static/css/layui-skin/style.css' //extend加载新的样式
	    , skin: 'layer-ext-fo' //设定样式，所有弹层风格都采用此主题。
    }).use(['layer', 'element', 'form', 'table'], function(){
        var table = layui.table;
        var form = layui.form;
        
        var datas = [
            {id: 'YD-A', title: '行政、文化等' },
            {id: 'YD-B', title: '商业等' },
            {id: 'YD-EG', title: '水域、农林、绿化、广场' },
            {id: 'YD-HM', title: '工业、交通、军事' },
            {id: 'YD-U', title: '供水电气热等' },
            {id: 'YD-RW', title: 'R类和物流' },
            {id: 'YD-EDGE', title: '备用和增长边界' },
            {id: 'YD-Other', title: '其他' },
        ]

        table.render({
            id:'geojsonBtnFilter'
            , elem: '#geojsonBtnTableId'
            , data: datas
			, limit:50
            , cols: [[ {checkbox: true}
               ,{
                field: 'id'
                , align:'center'
                , toolbar: '#flashBtnTmpl'
               }, {
                field: 'id'
                , align:'left'
                , toolbar: '#geojsonBtnTmpl'
               } ]]
        })

        //监听按钮操作
        table.on('tool(geojsonBtnFilter)', function(obj){
            switch (obj.event) {
                case 'click':
                    loadMutiGeojson( viewer, layerGroupId2URLs(obj.data.id),
                        'http://127.0.0.1/assets/geojson/洛阳新安总规图/'); // fillJson 定义在showAttr.js
                    break;
                case 'clickFlash':
                    flashGJson( layerGroupId2URLs(obj.data.id));
                    break;
                default:
                    return;
            }
        });
        table.on('checkbox(geojsonBtnFilter)', function(obj){
            showGjson( layerGroupId2URLs(obj.data.id), obj.checked);
        });
        
    })
	
	function layerGroupId2URLs(id) {
		var url = ''
		if (id == 'YD-A') { // 行政文化
            return layerListA;
		} else if (id == 'YD-B') { // 商业
            return layerListB;
		} else if (id == 'YD-EG') { // 水域绿化广场
            return layerListEG;
		} else if (id == 'YD-HM') { // 工业交通军事
            return layerListB;
		} else if (id == 'YD-U') { // 水电气热
            return layerListB;
		} else if (id == 'YD-RW') { // R和物流
            return layerListB;
		} else if (id == 'YD-EDGE') { // 备用 边界
            return layerListEDGE;
		} else if (id == 'YD-Other') { // 其他
            return layerListEDGE;
        }
		return []
	}

    ////////////////////////////////////////////////////////////
    
    // 初始化实景模型按钮列表
    layui.config({
        base: 'static/js/'
        , extend: 'static/css/layui-skin/style.css' //extend加载新的样式
        , skin: 'layer-ext-fo' //设定样式，所有弹层风格都采用此主题。
    }).use(['layer', 'element', 'form', 'table'], function(){
        var table = layui.table;
        var form = layui.form;
        
        var datas = [
            // {id: 'shenyang', title: '沈阳' },
            {id: 'xaxc19', title: '实景模型-2019' },
            {id: 'zgcm11-13', title: '实景模型-东' },
            {id: 'zgcm8-10', title: '实景模型-中' },
            {id: 'zgcm5-7', title: '实景模型-西' },
            {id: 'zgcmX1', title: '实景模型-厂区1' },
            {id: 'zgcmX2', title: '实景模型-厂区2' },
            {id: 'zgcmX3', title: '实景模型-厂区3' },
            {id: 'zgcmX4', title: '实景模型-厂区4' },
            {id: 'zgcmX5', title: '实景模型-厂区5' },
            {id: 'zgcmX6', title: '实景模型-厂区6' },
            {id: '6-3m', title: '实景模型6-3' },
            {id: 'cjm1-6', title: '实景模型-磁涧北' },
            {id: 'cj50', title: '实景模型-磁涧50' },
            {id: 'cj100', title: '实景模型-磁涧100' },
            {id: 'cjm-b', title: '实景模型-磁涧55' },
        ]

        table.render({
            id:'osgbModelBtnFilter'
            , elem: '#osgbModelBtnTableId'
            , data: datas
            , limit:50
            , cols: [[ {
                field: 'id'
                , align:'center'
                , toolbar: '#osgbModelBtnTmpl'
               }
               ,{
                field: 'id'
                , align:'center'
                , toolbar: '#flyToBtnTmpl'
               }
               ,{checkbox: true}  ]]
        })

        //监听按钮操作
        table.on('tool(osgbModelBtnFilter)', function(obj){
            switch (obj.event) {
                case 'click':
                    loadOsgb(viewer, osgbId2URL(obj.data.id));
                    break;
                case 'clickFlyTo':
                    flyToOsgb(viewer, osgbId2URL(obj.data.id));
                    break;
                default:
                    return;
            }
        });
        table.on('checkbox(osgbModelBtnFilter)', function(obj){
            showOsgb(viewer, osgbId2URL(obj.data.id), obj.checked);
        });
        
    })
	
    ////////////////////////////////////////////////////////////

    // 初始化人工模型按钮列表
    layui.config({
        base: 'static/js/'
        , extend: 'static/css/layui-skin/style.css' //extend加载新的样式
        , skin: 'layer-ext-fo' //设定样式，所有弹层风格都采用此主题。
    }).use(['layer', 'element', 'form', 'table'], function(){
        var table = layui.table;
        var form = layui.form;
        
        var datas = [
            // {id: 'bgy', title: '碧桂园' },
            // {id: 'jianye', title: '建业' },
            {id: 'cw', title: '陈湾' },
            {id: 'sc', title: '宋村' },
            {id: 'sm1', title: '石庙' },
            {id: 'bxw', title: '正锦水岸' },
            {id: 'zz3', title: '江天悦澜湾' },
			{id: 'yey', title: '新安幼儿园' },
        ]

        table.render({
            id:'objModelBtnFilter'
            , elem: '#objModelBtnTableId'
            , data: datas
            , limit:50
            , cols: [[ {
                field: 'id'
                , align:'center'
                , toolbar: '#objModelBtnTmpl' 
               }
               ,{
                field: 'id'
                , align:'center'
                , toolbar: '#flyToBtnTmpl'
               }
               ,{checkbox: true} ]]
        })

        //监听按钮操作
        table.on('tool(objModelBtnFilter)', function(obj){
            switch (obj.event) {
                case 'click':
                    objModelOP.loadModel( getObjContext(obj.data.id));
                    break;
                case 'clickFlyTo':
                objModelOP.flyToModel( getObjContext(obj.data.id));
                    break;
                default:
                    return;
            }
        });
        table.on('checkbox(objModelBtnFilter)', function(obj){
            objModelOP.showModel( getObjContext(obj.data.id), obj.checked);
        });
        
    })

    ////////////////////////////////////////////////////////////
    
    // 初始化地面平整按钮列表
    layui.config({
        base: 'static/js/'
        , extend: 'static/css/layui-skin/style.css' //extend加载新的样式
	    , skin: 'layer-ext-fo' //设定样式，所有弹层风格都采用此主题。
    }).use(['layer', 'element', 'form', 'table'], function(){
        var table = layui.table;
        var form = layui.form;
        
        var datas = [
            // {id: 'bgy', title: '碧桂园' },
            // {id: 'jianye', title: '建业' },
            {id: 'cw', title: '陈湾' },
            {id: 'sc', title: '宋村' },
            {id: 'sm1', title: '石庙' },
            {id: 'bxw', title: '正锦水岸' },
            {id: 'zz3', title: '江天悦澜湾' },
			{id: 'yey', title: '新安幼儿园' },
        ]

        table.render({
            id:'blockPlanBtnFilter'
            , elem: '#blockPlanBtnTableId'
            , data: datas
			, limit:50
            , cols: [[ {
                field: 'id'
                , align:'center'
                , toolbar: '#blockPlanBtnTmpl' 
               }
               ,{
                field: 'id'
                , align:'center'
                , toolbar: '#flyToClipBtnTmpl'
               }
               ,{checkbox: true}   ]]
        })

        //监听按钮操作
        table.on('tool(blockPlanBtnFilter)', function(obj){
            var ctx = getBlockContext(obj.data.id)
            switch (obj.event) {
                case 'click':
                    blockPlan.clipModel(viewer, ctx);
                    break;
                case 'clickClip':
                blockPlan.unClipModel(viewer, ctx);
                    break;
                default:
                    return;
            }
        });
        table.on('checkbox(blockPlanBtnFilter)', function(obj){
            var ctx = getBlockContext(obj.data.id)
            blockPlan.showClipModelBottoms(viewer, ctx, obj.checked);
            blockPlan.showClipModelWalls(viewer, ctx, obj.checked);
        });
        
    })

    ////////////////////////////////////////////////////////////

    $(".nav-h>li>a").on('click', function () {
        console.log('$(".nav>li>a") click ...', layer)
        var width = 300;
        var opt = {
            type: 1,
            shade: 0,
            area: [width + 'px', '100%'],
            offset: ['0', '0'],
            move: false,
            resize: false,
        };
        if (!layer) {
            return;
        }
        
        var curBtnBackgroundColor = '#cd853f', bg='unset'

        var btnId = $(this).context.id
        if (btnId === "showUser") { //用户数据
            layerCloseAll();
        } else if (btnId === "showShare") { //共享数据
        //    layerCloseAll();
        } else if (btnId === "showGeoJSONBtn") { //总规图
			if( showGeoJSONPan<0 ){
				bg=curBtnBackgroundColor
                showGeoJSONPan =  openPane(btnId, $('#geojsonBtnGroup'), '总规图', ()=>{
					showGeoJSONPan = -1
				})
			}else{
                layer.close(showGeoJSONPan); //关闭当前窗口
                showGeoJSONPan = -1
			}
        } else if (btnId === "showObjBtn") { //人工模型
            if( objModelBtnPan<0 ){
                bg=curBtnBackgroundColor
                objModelBtnPan =  openPane(btnId, $('#objModelBtnGroup'), '人工模型', ()=>{
                    objModelBtnPan = -1
                })
            }else{
                layer.close(objModelBtnPan); //关闭当前窗口
                objModelBtnPan = -1
            }
        } else if (btnId === "showOsgbBtn") { //实景模型
            if( osgbModelBtnPan<0 ){
                bg=curBtnBackgroundColor
                osgbModelBtnPan =  openPane(btnId, $('#osgbModelBtnGroup'), '实景模型', ()=>{
                    osgbModelBtnPan = -1
                })
            }else{
                layer.close(osgbModelBtnPan); //关闭当前窗口
                osgbModelBtnPan = -1
            }
        } else if (btnId === "showAttrBtn") { //查看属性，相关代码在showAttr.js
			if( !showAttr.ShowAttrIsActived() ){
				bg=curBtnBackgroundColor
                showAttr.activeShowAttrHandler(CViewer)
            }else{
                showAttr.unactiveShowAttrHandler()
                blockPlanBtnPan = -1
            }
        } else if (btnId === "showBlockBtn") { //地面平整
			if( blockPlanBtnPan<0 ){
				bg=curBtnBackgroundColor
                blockPlanBtnPan =  openPane(btnId, $('#blockPlanBtnGroup'), '地面平整', ()=>{
					blockPlanBtnPan = -1
				})
            }else{
                layer.close(blockPlanBtnPan); //关闭当前窗口
                blockPlanBtnPan = -1
            }
        } else if (btnId === "moveObjBtn") { //移动模型
			if( objMoveBtnPan<0 ){
				bg=curBtnBackgroundColor
                objMoveBtnPan =  openPane(btnId, $('#objMoveBtnPan'), '移动模型', ()=>{
                    objMoveBtnPan = -1
					let toolTip=   document.getElementById("toolTip")
					toolTip.style.display = "none";
					objModelOP.disableMoveModel()
				},200,200)
                objModelOP.enableMoveModel(('#objMoveBtnPan'),()=>{
                    layer.close(objMoveBtnPan);
                    objMoveBtnPan = -1
                })
            }else{
                objModelOP.disableMoveModel()
                layer.close(objMoveBtnPan); //关闭当前窗口
                objMoveBtnPan = -1
            }
        } else if (btnId === "sunBtn") { //日照分析
            if( sunBtnPan<0 ){
                bg=curBtnBackgroundColor
                sunBtnPan =  openPane(btnId, $('#sunPane'), '日照分析', ()=>{
                    sunBtnPan = -1
                }, 370, 260)
            }else{
                layer.close(sunBtnPan); //关闭当前窗口
                sunBtnPan = -1
            }
        } else if (btnId === "settingBtn") { //地球设置
            if( settingBtnPan<0 ){
                bg=curBtnBackgroundColor
                settingBtnPan =  openPane(btnId, $('#settingPane'), '地球设置', ()=>{
                    settingBtnPan = -1
                })
            }else{
                layer.close(settingBtnPan); //关闭当前窗口
                settingBtnPan = -1
            }
        } else if (btnId === "showImage") { //影像底图
        //    layerCloseAll();
        //} else if (btnId === "") { //上传edb
        //} else if (btnId === "") { //上传倾斜模型
        //} else if (btnId === "") { //上传点云
        // } else if (btnId === "") { //添加标记
        //     drawHelper.startDrawingMarker({
        //         callback: function (position) {
        //             onDrawMarkerCreated({
        //                 name: 'markerCreated',
        //                 position: position
        //             });
        //         }
        //     });
        // } else if (btnId === "") { //添加范围
        //     drawHelper.startDrawingPolygon({
        //         callback: function (positions, height) {
        //             onDrawPolygonCreated({
        //                 name: 'polygonCreated',
        //                 positions: positions,
        //                 height: height
        //             });
        //         }
        //     });
        // } else if (btnId === "") { //PAD方式添加范围线
        //     var ret = drawHelper.startPadDrawingPolygon({
        //         callback: function (positions, height) {
        //             onDrawPolygonCreated({
        //                 name: 'polygonCreated',
        //                 positions: positions,
        //                 height: height
        //             });
        //         }
        //     });
        //     var g_movement = {};
        //     ret.funcSetInputAction(ret.mouseHandler, function (movement) {
        //         g_movement = movement;
        //         ret.funcTryPoint(movement);
        //     });
        //
        //     //连接“加点”按钮
        //     function addPt() {
        //         ret.funcAddPoint(g_movement);
        //     }
        //
        //     //连接“保存并结束”按钮
        //     function addPt() {
        //         ret.funcEndInput(g_movement);
        //     }
        } else if (btnId == "kongjianCeDianBtn") { //测点
            clearCeLiangBtnBackgroundColor()
            measure.measurementPoint("toolTip", "#kongjianCeDianPan", clearCeLiangBtnBackgroundColor);
            if (measure.currentOPStat=='measurementPoint')  bg=curBtnBackgroundColor
        } else if (btnId == "tdCeJuBtn") { //贴地测距
            clearCeLiangBtnBackgroundColor()
            measure.measurementGround("toolTip", "#tdCeJuPan", clearCeLiangBtnBackgroundColor);
            if ( measure.currentOPStat=='measurementGround')  bg=curBtnBackgroundColor
            //             layer.open({
            //     type: 1,
            //     content: $('#id') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            // });
        } else if (btnId == "kongjianCeJuBtn") { //空间测距
            clearCeLiangBtnBackgroundColor()
            measure.measurementSpace("toolTip", "#kongjianCeJuPan", clearCeLiangBtnBackgroundColor);
            if ( measure.currentOPStat=='measurementSpace')  bg=curBtnBackgroundColor
        } else if (btnId === "gaoduBtn") { //高度
            clearCeLiangBtnBackgroundColor()
            measure.measureHeight("toolTip", "#gaoduPan", clearCeLiangBtnBackgroundColor);
            if ( measure.currentOPStat=='measureHeight')  bg=curBtnBackgroundColor
            // layer.open({
            //     type: 1,
            //     content: $('#id') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            // });
        } else if (btnId == "sanjiaoCeJuBtn") { //三角测量
            clearCeLiangBtnBackgroundColor()
            measure.measurementTriangle("toolTip", "#sanjiaoPan", clearCeLiangBtnBackgroundColor);
            if ( measure.currentOPStat=='measurementTriangle')  bg=curBtnBackgroundColor
        } else if (btnId == "fangLiangBtn") { //方量计算
            clearCeLiangBtnBackgroundColor()
            // measurementVolume("toolTip", viewer);
            measure.fangLiangBtnClick("toolTip", "#fangLiangPan", clearCeLiangBtnBackgroundColor);
            if ( measure.currentOPStat!='')  bg=curBtnBackgroundColor
        } else if (btnId == "shuiyan") { //水淹效果
        //     console.log(111)
        //     var FloodRangelEntitys = new Cesium.CustomDataSource('FloodRangelEntitys');
        //     viewer.dataSources.add(FloodRangelEntitys);
        //     // var shuiyan = document.getElementById("shuiyan");
        //     $("#floodMenu").css('display', 'block')
        }
        document.getElementById(btnId).children[0].style.backgroundColor = bg
    })

    /*
    *  
    * */
    function setShowViewPos(viewer) {
        var longitude_show = document.getElementById('longitude_show');
        var latitude_show = document.getElementById('latitude_show');
        var altitude_show = document.getElementById('altitude_show');
        var x_show = document.getElementById('x_show');
        var y_show = document.getElementById('y_show');
        var canvas = viewer.scene.canvas;
        //具体事件的实现  
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var handler = new Cesium.ScreenSpaceEventHandler(canvas);
        handler.setInputAction(function (movement) {
            //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点  
            var cartesian = measure.getCartesianFromMousePos(movement.endPosition) // viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
            if (cartesian) {
                //将笛卡尔三维坐标转为地图坐标（弧度）  
                let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                let lat = Cesium.Math.toDegrees(cartographic.latitude)
                let lon = Cesium.Math.toDegrees(cartographic.longitude)
                let epsg4546 = objModelOP.WGS84ToEPSG4546({x:lon, y:lat, z:cartographic.height})
                //将地图坐标（弧度）转为十进制的度数  
                let lat_String = lat.toFixed(8);
                let log_String = lon.toFixed(8);
                let hei = viewer.camera.positionCartographic.height
                if (hei>2000)hei = (hei / 1000).toFixed(2) + "公里";
                else hei=hei.toFixed(2)+"米"
                longitude_show.innerHTML = log_String;
                latitude_show.innerHTML = lat_String;
                altitude_show.innerHTML = hei;
                x_show.innerHTML = epsg4546.x.toFixed(3);
                y_show.innerHTML = epsg4546.y.toFixed(3);
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    }


