class kbzhu_chart{
  constructor(containerId) {
    this.containerId = containerId;
    this.chart = null;
    this.series = null;
  }

  init() {
    this.chart = anychart.column();
    this.series = this.chart.column([]);
    this.chart.title('Статистика КБЖУ трекера за день');
    this.chart.container(this.containerId);
    this.chart.draw();
  }

  update(payload) {
    const totals = payload.totalsCPFC;

    const data = [
      { x: 'Калорії', value: totals.calories },
      { x: 'Білки', value: totals.proteins },
      { x: 'Жири',  value: totals.fats },
      { x: 'Вуглеводи', value: totals.carbs }
    ];

    this.series.data(data); 
  }
}