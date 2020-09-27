
//极坐标堆叠区域图
function showT0(){
    var dom = document.getElementById("taskECharts_t0");

    var myChart = echarts.init(dom);
    option = {
        title: {
            text: '项目任务完成情况 - 极坐标堆叠区域图'
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        angleAxis: {
        },
        radiusAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '总任务数'],
            z: 10
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: [1, 2, 3, 4, 18],
            coordinateSystem: 'polar',
            name: '陈苏娟',
            stack: 'a'
        }, {
            type: 'bar',
            data: [2, 4, 6, 8, 10],
            coordinateSystem: 'polar',
            name: '王涛',
            stack: 'a'
        }, {
            type: 'bar',
            data: [1, 2, 3, 4, 8],
            coordinateSystem: 'polar',
            name: '王浩',
            stack: 'a'
        }],
        legend: {
            show: true,
            data: ['陈苏娟', '王涛', '王浩']
        }
    };
    myChart.setOption(option, true);
    
}
showT0();

var dataList={}
dataList['项目A']=[120, 132, 101, 134, 90, 230, 210]
dataList['项目B']=[220, 182, 191, 234, 290, 330, 310]
dataList['项目C']=[150, 232, 201, 154, 190, 330, 410]
dataList['项目D']=[320, 332, 301, 334, 390, 330, 320]
dataList['项目E']=[820, 932, 901, 934, 1290, 1330, 1320]

//堆叠区域图
function showT1(){ 
    var dom = document.getElementById("taskECharts_t1");

    var myChart = echarts.init(dom);

    option = {
        title: {
            text: '项目工时 - 堆叠区域图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['项目A', '项目B', '项目C', '项目D', '项目E']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '项目A',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: dataList['项目A']
            },
            {
                name: '项目B',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: dataList['项目B']
            },
            {
                name: '项目C',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: dataList['项目C']
            },
            {
                name: '项目D',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: dataList['项目D']
            },
            {
                name: '项目E',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: dataList['项目E']
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

showT1();

//饼图
function showT2(){
    var dom = document.getElementById("taskECharts_t2");

    var myChart = echarts.init(dom);

    var data = genData(50);

    option = {
        title: {
            text: '七月项目工时统计',
            subtext: '纯属虚构',
            left: 'center'
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: data.legendData,

            selected: data.selected
        },
        series: [
            {
                name: '姓名',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: data.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    function genData(count) {
        var legendData = [];
        var seriesData = [];
        var selected = {};
        for (var k in dataList) {
            name = k
            legendData.push(name);
            seriesData.push({
                name: name,
                value: dataList[k]
            });
            selected[name] = (name.substr(0,2) === '项目');
        }

        return {
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
        };

    }

    myChart.setOption(option, true);
}
showT2();

//甘特图
function showT3(){
    var myCharts = echarts.init(document.getElementById('taskECharts_t3'));
    var option = {
        backgroundColor: "#fff",
        title: {
            text: "项目甘特图",
            padding: 20,
            textStyle: {
                fontSize: 17,
                fontWeight: "bolder",
                color: "#333"
            },
            subtextStyle: {
                fontSize: 13,
                fontWeight: "bolder"
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        legend: {
            data: ["计划工期", "可行性研究阶段", "初步设计阶段", "施工图设计阶段", "项目实施阶段", "项目验收阶段"],
            align: "right",
            right: 80,
            top: 50
        },
        grid: {
            containLabel: true,
            show: false,
            right: 130,
            left: 40,
            bottom: 40,
            top: 90
        },
        xAxis: {
            type: "time",
            axisLabel: {
                "show": true,
                "interval": 0
            }
        },
        dataZoom: [{
            type: 'inside',
        }, {
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        yAxis: {
            axisLabel: {
                show: true,
                interval: 0,
                formatter: function(value, index) {
                    var last = ""
                    var max = 5;
                    var len = value.length;
                    var hang = Math.ceil(len / max);
                    if (hang > 1) {
                        for (var i = 0; i < hang; i++) {
                            var start = i * max;
                            var end = start + max;
                            var temp = value.substring(start, end) + "\n";
                            last += temp; //拼接最终的字符串
                        }
                        return last;
                    } else {
                        return value;
                    }
                }
            },
            data: ["项目A", "项目B", "项目C"]
        },
        tooltip: {
            trigger: "axis",
            formatter: function(params) {
                var res = "";
                var name = "";
                var start0 = "";
                var start = "";
                var end0 = "";
                var end = "";
                for (var i in params) {
                    var k = i % 2;
                    if (!k) { //奇数
                        name = params[i].seriesName;
                        end0 = params[i].data;
                        end = end0.getFullYear() + "-" + (end0.getMonth() + 1) + "-" + end0.getDate();
                    }
                    if (k) { //偶数
                        start0 = params[i].data;
                        start = start0.getFullYear() + "-" + (start0.getMonth() + 1) + "-" + start0.getDate();
                        res += name + " : " + start + "~" + end + "</br>";
                    }
                }
                return res;
            }
        },
        series: [{
                name: "计划工期",
                type: "bar",
                stack: "总量0",
                label: {
                    normal: {
                        show: true,
                        color: "#000",
                        position: "right",
                        formatter: function(params) {
                            return params.seriesName
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "skyblue",
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                },
                zlevel: -1,
                data: [new Date("2020-05-01"), new Date("2020-03-14"), new Date("2020-05-01")]
            },
            {
                name: "计划工期",
                type: "bar",
                stack: "总量0",
                itemStyle: {
                    normal: {
                        color: "white",
                    }
                },
                zlevel: -1,
                z: 3,
                data: [new Date("2020-01-01"), new Date("2020-01-01"), new Date("2020-03-15")]
            },
            {
                name: "分析阶段",
                type: "bar",
                stack: "总量2",
                label: {
                    normal: {
                        show: true,
                        color: "#000",
                        position: "right",
                        formatter: function(params) {
                            return params.seriesName
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "green",
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                },
                zlevel: -1,
                data: [new Date("2020-01-10"), new Date("2020-01-10"), new Date("2020-03-30")]
            },
            {
                name: "分析阶段",
                type: "bar",
                stack: "总量2",
                itemStyle: {
                    normal: {
                        color: "white",
                    }
                },
                zlevel: -1,
                z: 3,
                data: [new Date("2020-01-02"), new Date("2020-01-02"), new Date("2020-03-16")]
            },
            {
                name: "开发阶段",
                type: "bar",
                stack: "总量3",
                label: {
                    normal: {
                        show: true,
                        color: "#000",
                        position: "right",
                        formatter: function(params) {
                            return params.seriesName
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "red",
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                },
                zlevel: -1,
                data: [new Date("2020-02-20"), new Date("2020-01-20"), new Date("2020-04-10")]
            },
            {
                name: "开发阶段",
                type: "bar",
                stack: "总量3",
                itemStyle: {
                    normal: {
                        color: "white"
                    }
                },
                zlevel: -1,
                z: 3,
                data: [new Date("2020-02-01"), new Date("2020-01-12"), new Date("2020-04-01")]
            },
            {
                name: "集成阶段",
                type: "bar",
                stack: "总量4",
                label: {
                    normal: {
                        show: true,
                        color: "#000",
                        position: "right",
                        formatter: function(params) {
                            return params.seriesName
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "brown",
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                },
                zlevel: -1,
                data: [new Date("2020-03-09"), new Date("2020-01-25"), new Date("2020-04-20")]
            },
            {
                name: "集成阶段",
                type: "bar",
                stack: "总量4",
                itemStyle: {
                    normal: {
                        color: "white",
                    }
                },
                zlevel: -1,
                z: 3,
                data: [new Date("2020-02-25"), new Date("2020-01-21"), new Date("2020-04-11")]
            },
            {
                name: "测试阶段",
                type: "bar",
                stack: "总量5",
                label: {
                    normal: {
                        show: true,
                        color: "#000",
                        position: "right",
                        formatter: function(params) {
                            return params.seriesName
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "yellow",
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                },
                zlevel: -1,
                data: [new Date("2020-03-12"), new Date("2020-02-15"), new Date("2020-04-30")]
            },
            {
                name: "测试阶段",
                type: "bar",
                stack: "总量5",
                itemStyle: {
                    normal: {
                        color: "white",
                    }
                },
                zlevel: -1,
                z: 3,
                data: [new Date("2020-03-10"), new Date("2020-01-26"), new Date("2020-04-21")]
            },
            {
                name: "验收阶段",
                type: "bar",
                stack: "总量6",
                label: {
                    normal: {
                        show: true,
                        color: "#000",
                        position: "right",
                        formatter: function(params) {
                            return params.seriesName
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'orange',
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                },
                zlevel: -1,
                data: [new Date("2020-03-30"), new Date("2020-03-13"), new Date("2020-05-01")]
            },
            {
                name: "验收阶段",
                type: "bar",
                stack: "总量6",
                itemStyle: {
                    normal: {
                        color: 'white',
                    }
                },
                zlevel: -1,
                z: 3,
                data: [new Date("2020-03-15"), new Date("2020-02-16"), new Date("2020-04-30")]
            },
        ]
    }
    myCharts.setOption(option, true);
}
showT3();
