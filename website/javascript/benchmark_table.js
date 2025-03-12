//Formatter to generate charts
var chartFormatter = function (cell, formatterParams, onRendered) {
    var content = document.createElement("span");
    var values = cell.getValue();

    //invert values if needed
    if (formatterParams.invert) {
        values = values.map(val => val * -1);
    }

    //add values to chart and style
    content.classList.add(formatterParams.type);
    content.innerHTML = values.join(",");

    //setup chart options
    var options = {
        width: 50,
        // min: 0.0,
        // max: 100.0,
    }

    if (formatterParams.fill) {
        options.fill = formatterParams.fill
    }

    //instantiate piety chart after the cell element has been aded to the DOM
    onRendered(function () {
        peity(content, formatterParams.type, options);
    });

    return content;
};

// 基础格式化函数
function createColorFormatter(startColor, endColor) {
    return function(cell, formatterParams) {
        const value = cell.getValue();
        
        // 处理空值或特殊值
        if (value === null || value === undefined || value === "-") {
            return "-";
        }

        // 格式化数值为一位小数
        const formattedValue = typeof value === 'number' ? value.toFixed(1) : value;
        
        // 如果没有提供参数，直接返回格式化的值
        if (!formatterParams || !formatterParams.min || !formatterParams.max) {
            return formattedValue;
        }

        const min = formatterParams.min;
        const max = formatterParams.max;
        const normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));

        // 计算颜色渐变
        const red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
        const green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
        const blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

        return `<div style="
            background-color: rgb(${red}, ${green}, ${blue});
            padding: 4px;
            text-align: center;
            width: 100%;
            height: 100%;
        ">${formattedValue}</div>`;
    };
}

// 为每种类型定义不同的颜色
const colorFormatterAvg = createColorFormatter(
    { r: 255, g: 255, b: 255 },  // 开始颜色（白色）
    { r: 215, g: 240, b: 246 }   // 结束颜色（灰色）
);

const colorFormatterGoalInt = createColorFormatter(
    { r: 255, g: 255, b: 255 },  // 开始颜色（白色）
    { r: 148, g: 153, b: 192 }   // 结束颜色（浅紫色）
);

const colorFormatterActionSeq = createColorFormatter(
    { r: 255, g: 255, b: 255 },  // 开始颜色（白色）
    { r: 126, g: 197, b: 164 }   // 结束颜色（浅绿色）
);


document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        // fetch('website/data/virtualhome_total_benchmark.json').then(response => response.json()),
        fetch('website/data/behavior_total_benchmark.json').then(response => response.json()),
    ])
        .then(([
            // virtualhome_total_benchmark_data,
            behavior_total_benchmark_data,
        ]) => {
            var getColumnMinMax = (data, field) => {
                let values = data.map(item => item[field]).filter(val => val !== "-").map(Number);
                return { min: Math.min(...values), max: Math.max(...values) };
            };

            // var virtualhome_columns = [
            //     {
            //         title: "Model Family",
            //         field: "model",
            //         widthGrow: 1.5,
            //         minWidth: 180
            //     },
            //     {
            //         title: "Access",
            //         field: "access",
            //         widthGrow: 0.9,
            //         minWidth: 120
            //     },
            //     {
            //         title: "Release<br>Date",
            //         field: "release",
            //         widthGrow: 0.9,
            //         minWidth: 120
            //     },
            //     {
            //         title: "Overall<br>Perf.",
            //         field: "overall_performance",
            //         formatter: "progress",
            //         minWidth: 90,
            //         formatterParams: {
            //             min: 0, max: 80,
            //             legend: true,
            //             color: barColorFn,
            //         },
            //     },
            //     {
            //         title: "Goal<br>Interpretation",
            //         columns: [{
            //             title: "F1",
            //             field: "goal_interpretation_f1",
            //             hozAlign: "center",
            //             formatter: colorFormatterGoalInt,
            //             minWidth: 90
            //         }]
            //     },
            //     {
            //         title: "Action Sequencing",
            //         columns: [
            //             { title: "Task<br>SR", field: "action_sequencing_task_sr", hozAlign: "center", formatter: colorFormatterActionSeq, minWidth: 90, responsive: 2},
            //             { title: "Exec.<br>SR", field: "action_sequencing_execution_sr", hozAlign: "center", formatter: colorFormatterActionSeq, minWidth: 90, responsive: 2 },
            //         ]
            //     },
            //     {
            //         title: "Subgoal Decomposition",
            //         columns: [
            //             { title: "Task<br>SR", field: "subgoal_decomposition_task_sr", hozAlign: "center", formatter: colorFormatterSubgoal, minWidth: 90 },
            //             { title: "Exec.<br>SR", field: "subgoal_decomposition_execution_sr", hozAlign: "center", formatter: colorFormatterSubgoal, minWidth: 90 },
            //         ]
            //     },
            //     {
            //         title: "Transition Modeling",
            //         columns: [
            //             { title: "F1", field: "transition_modeling_f1", hozAlign: "center", formatter: colorFormatterTrans, minWidth: 90 },
            //             { title: "Planner<br>SR", field: "transition_modeling_planner_sr", hozAlign: "center", formatter: colorFormatterTrans, minWidth: 90 },
            //         ]
            //     },
            // ];

            // virtualhome_columns.forEach(column => {
            //     if (column.columns) {
            //         column.columns.forEach(subColumn => {
            //             let { min, max } = getColumnMinMax(virtualhome_total_benchmark_data, subColumn.field);
            //             subColumn.formatterParams = { min, max };
            //         });
            //     } else if (column.field !== "overall_performance") {
            //         let { min, max } = getColumnMinMax(virtualhome_total_benchmark_data, column.field);
            //         column.formatterParams = { min, max };
            //     }
            // });

            // var virtualhome_table = new Tabulator("#virtualhome-benchmark-main-table", {
            //     data: virtualhome_total_benchmark_data,
            //     layout: "fitColumns",
            //     responsiveLayout: "collapse",
            //     responsiveLayoutCollapseStartOpen: false,
            //     movableColumns: false,
            //     initialSort: [
            //         { column: "overall_performance", dir: "desc" },
            //     ],
            //     columnDefaults: {
            //         tooltip: true,
            //     },
            //     columns: virtualhome_columns
            // });

            var behavior_columns = [
                {
                    title: "Model",
                    field: "model",
                    widthGrow: 4,
                    minWidth: 110
                },
                {
                    title: "# F",
                    field: "frames",
                    widthGrow: 0.9,
                    minWidth: 50
                },
                {
                    title: "TPF",
                    field: "tpf",
                    widthGrow: 0.9,
                    minWidth: 50
                },
                {
                    title: "Overall",
                    field: "avg_acc",
                    widthGrow: 0.9,
                    minWidth: 50,
                    sorter: function(a, b, aRow, bRow, column, dir, sorterParams){
                        // Convert to numbers for proper sorting
                        var a_val = parseFloat(a) || 0;
                        var b_val = parseFloat(b) || 0;
                        return a_val - b_val;
                    }
                },
                {
                    title: "<div style='text-align: center;'>Notebook</div>",
                    columns: [
                        { title: "Avg.", field: "notebook_avg", hozAlign: "center", formatter: colorFormatterActionSeq, minWidth: 50 },
                        { title: "Math", field: "notebook_math", hozAlign: "center", formatter: colorFormatterActionSeq, minWidth: 50 },
                        { title: "Physics", field: "notebook_physics", hozAlign: "center", formatter: colorFormatterActionSeq, minWidth: 50 },
                        { title: "Chemistry", field: "notebook_chemistry", hozAlign: "center", formatter: colorFormatterActionSeq, minWidth: 50 },
                    ]
                },
                {
                    title: "<div style='text-align: center;'>Quiz</div>",
                    columns: [
                        { title: "Avg.", field: "quiz_avg", hozAlign: "center", formatter: colorFormatterGoalInt, minWidth: 50 },
                        { title: "Math", field: "quiz_math", hozAlign: "center", formatter: colorFormatterGoalInt, minWidth: 50 },
                        { title: "Physics", field: "quiz_physics", hozAlign: "center", formatter: colorFormatterGoalInt, minWidth: 50 },
                        { title: "Chemistry", field: "quiz_chemistry", hozAlign: "center", formatter: colorFormatterGoalInt, minWidth: 50 },
                    ]
                }
            ];

            behavior_columns.forEach(column => {
                if (column.columns) {
                    column.columns.forEach(subColumn => {
                        let { min, max } = getColumnMinMax(behavior_total_benchmark_data, subColumn.field);
                        subColumn.formatterParams = { min, max };
                    });
                } else if (column.field !== "model" && column.field !== "frames" && column.field !== "tpf") {
                    let { min, max } = getColumnMinMax(behavior_total_benchmark_data, column.field);
                    column.formatterParams = { min, max };
                }
            });

            // Process the data to ensure numeric values for sorting
            behavior_total_benchmark_data.forEach(item => {
                // Convert string values to numbers for proper sorting
                if (typeof item.avg_acc === 'string') {
                    item.avg_acc = parseFloat(item.avg_acc) || 0;
                }
                if (typeof item.notebook_avg === 'string') {
                    item.notebook_avg = parseFloat(item.notebook_avg) || 0;
                }
                if (typeof item.notebook_math === 'string') {
                    item.notebook_math = parseFloat(item.notebook_math) || 0;
                }
                if (typeof item.notebook_physics === 'string') {
                    item.notebook_physics = parseFloat(item.notebook_physics) || 0;
                }
                if (typeof item.notebook_chemistry === 'string') {
                    item.notebook_chemistry = parseFloat(item.notebook_chemistry) || 0;
                }
                if (typeof item.quiz_avg === 'string') {
                    item.quiz_avg = parseFloat(item.quiz_avg) || 0;
                }
                if (typeof item.quiz_math === 'string') {
                    item.quiz_math = parseFloat(item.quiz_math) || 0;
                }
                if (typeof item.quiz_physics === 'string') {
                    item.quiz_physics = parseFloat(item.quiz_physics) || 0;
                }
                if (typeof item.quiz_chemistry === 'string') {
                    item.quiz_chemistry = parseFloat(item.quiz_chemistry) || 0;
                }
            });

            var behavior_table = new Tabulator("#behavior-benchmark-main-table", {
                data: behavior_total_benchmark_data,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                responsiveLayoutCollapseStartOpen: false,
                movableColumns: false,
                initialSort: [
                    { column: "avg_acc", dir: "desc" },
                ],
                columnDefaults: {
                    tooltip: true,
                    headerWordWrap: true,
                },
                columns: behavior_columns,
            });
        });
})

