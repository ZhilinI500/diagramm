import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { MyEvents } from "./myEvents.service";


@Injectable()
export class MenuService {
  gilds = [
    { id: "002", value: "Рудник" },
    { id: "003", value: "РОФ" },
    { id: "004", value: "Аглоцех" },
    { id: "006", value: "Дробильно-обжиговый цех" },
    { id: "010", value: "ЦПАШ" },
    { id: "030", value: "Управление КХП" },
    { id: "032", value: "Углеподготовительный цех" },
    { id: "033", value: "Коксовый цех" },
    { id: "037", value: "ЦУПХП" },
    { id: "060", value: "Доменный цех" },
    { id: "075", value: "Копровый цех" },
    { id: "071", value: "Сталеплавильный цех" },
    { id: "078", value: "Кислородно-конверторный цех" },
    { id: "108", value: "ПТЛ" },
    { id: "114", value: "Листопрокатный цех 4" },
    { id: "115", value: "Листопрокатный цех 5" },
    { id: "118", value: "Листопрокатный цех 8" },
    { id: "120", value: "Листопрокатный цех 10" },
    { id: "121", value: "Листопрокатный цех 11" },
    { id: "129", value: "ПМП" },
    { id: "130", value: "Сортовой цех" },
    { id: "183", value: "Энергоцех" },
    { id: "201", value: "ЦЭС" },
    { id: "202", value: "ТЭЦ" },
    { id: "203", value: "ПВЭС" },
    { id: "206", value: "Газовый цех" },
    { id: "207", value: "ЦВC" },
    { id: "208", value: "Кислородный цех" },
    { id: "210", value: "ПСЦ" },
    { id: "217", value: "ГСС" },
    { id: "406", value: "УПП" },
    { id: "478", value: "НТЦ" }
  ];

  producers = [
    { id: 'Гидротехпром', value: 'Гидротехпром' },
    { id: 'ККТ', value: 'ККТ' },
    { id: 'ОКС', value: 'ОКС' },
    { id: 'ООО ОСК', value: 'ООО ОСК' },
    { id: 'осДРинте', value: 'осДРинте' },
    { id: 'осДРтепр', value: 'осДРтепр' },
    { id: 'осДРусс', value: 'осДРусс' },
    { id: 'ОСКахо', value: 'ОСКахо' },
    { id: 'оскВСкрц', value: 'оскВСкрц' },
    { id: 'оскВСцрэмц', value: 'оскВСцрэмц' },
    { id: 'оскВСэрц', value: 'оскВСэрц' },
    { id: 'ОСКдр', value: 'ОСКдр' },
    { id: 'ОСКдс', value: 'ОСКдс' },
    { id: 'ОСКинтекс', value: 'ОСКинтекс' },
    { id: 'ОСКкип', value: 'ОСКкип' },
    { id: 'ОСКкрмц1', value: 'ОСКкрмц1' },
    { id: 'ОСКкрмц2', value: 'ОСКкрмц2' },
    { id: 'ОСКкрц', value: 'ОСКкрц' },
    { id: 'ОСКкрц1', value: 'ОСКкрц1' },
    { id: 'ОСКкрц2', value: 'ОСКкрц2' },
    { id: 'ОСКкэрц', value: 'ОСКкэрц' },
    { id: 'ОСКм.стр.м', value: 'ОСКм.стр.м' },
    { id: 'ОСКмгс', value: 'ОСКмгс' },
    { id: 'ОСКокс', value: 'ОСКокс' },
    { id: 'ОСКпкс1', value: 'ОСКпкс1' },
    { id: 'ОСКпкс2', value: 'ОСКпкс2' },
    { id: 'ОСКпкс3', value: 'ОСКпкс3' },
    { id: 'ОСКпкс4', value: 'ОСКпкс4' },
    { id: 'ОСКпр', value: 'ОСКпр' },
    { id: 'ОСКрмц', value: 'ОСКрмц' },
    { id: 'ОСКрсц', value: 'ОСКрсц' },
    { id: 'осКРЦ1гтп', value: 'осКРЦ1гтп' },
    { id: 'осКРЦ1окс', value: 'осКРЦ1окс' },
    { id: 'ОСКса', value: 'ОСКса' },
    { id: 'ОСКсз', value: 'ОСКсз' },
    { id: 'ОСКстовц', value: 'ОСКстовц' },
    { id: 'ОСКстс1', value: 'ОСКстс1' },
    { id: 'ОСКстс2', value: 'ОСКстс2' },
    { id: 'ОСКуа', value: 'ОСКуа' },
    { id: 'ОСКуки', value: 'ОСКуки' },
    { id: 'ОСКупр', value: 'ОСКупр' },
    { id: 'ОСКцв', value: 'ОСКцв' },
    { id: 'ОСКцвп', value: 'ОСКцвп' },
    { id: 'ОСКцркп', value: 'ОСКцркп' },
    { id: 'ОСКцрмо', value: 'ОСКцрмо' },
    { id: 'ОСКцрмо4', value: 'ОСКцрмо4' },
    { id: 'ОСКцрмо9', value: 'ОСКцрмо9' },
    { id: 'ОСКцрмп', value: 'ОСКцрмп' },
    { id: 'ОСКцрэмц', value: 'ОСКцрэмц' },
    { id: 'ОСКцрэо', value: 'ОСКцрэо' },
    { id: 'ОСКэнс', value: 'ОСКэнс' },
    { id: 'ОСКэнс1', value: 'ОСКэнс1' },
    { id: 'ОСКэнс2', value: 'ОСКэнс2' },
    { id: 'ОСКэрц', value: 'ОСКэрц' },
    { id: 'осРСЦант', value: 'осРСЦант' },
    { id: 'осРСЦинте', value: 'осРСЦинте' },
    { id: 'осРСЦмгс', value: 'осРСЦмгс' },
    { id: 'осРСЦмрс', value: 'осРСЦмрс' },
    { id: 'осРСЦмсм', value: 'осРСЦмсм' },
    { id: 'осРСЦпарм', value: 'осРСЦпарм' },
    { id: 'осРСЦресу', value: 'осРСЦресу' },
    { id: 'осРСЦсц', value: 'осРСЦсц' },
    { id: 'осРСЦтепр', value: 'осРСЦтепр' },
    { id: 'осРСЦуриц', value: 'осРСЦуриц' },
    { id: 'осРСЦутп', value: 'осРСЦутп' },
    { id: 'осЦР4азос', value: 'осЦР4азос' },
    { id: 'осЦР4гтп', value: 'осЦР4гтп' },
    { id: 'осЦР4мрс', value: 'осЦР4мрс' },
    { id: 'осЦР4оме', value: 'осЦР4оме' },
    { id: 'осЦР4рег', value: 'осЦР4рег' },
    { id: 'осЦР4уриц', value: 'осЦР4уриц' },
    { id: 'осЦР9парм', value: 'осЦР9парм' },
    { id: 'осЦРЭОинте', value: 'осЦРЭОинте' },
    { id: 'осЦРЭОкрс', value: 'осЦРЭОкрс' },
    { id: 'осЦРЭОмгс', value: 'осЦРЭОмгс' },
    { id: 'осЦРЭОмул', value: 'осЦРЭОмул' },
    { id: 'осЦРЭОпарм', value: 'осЦРЭОпарм' },
    { id: 'осЦРЭОтэо', value: 'осЦРЭОтэо' },
    { id: 'осЦРЭОутп', value: 'осЦРЭОутп' },
    { id: 'осЦРЭОэтн', value: 'осЦРЭОэтн' },
    { id: 'осЭНС2инте', value: 'осЭНС2инте' },
    { id: 'осЭНС2мгс', value: 'осЭНС2мгс' },
    { id: 'осЭНС2окс', value: 'осЭНС2окс' },
    { id: 'осЭНС2парм', value: 'осЭНС2парм' },
    { id: 'осЭНС2пэм', value: 'осЭНС2пэм' },
    { id: 'осЭНС2тэо', value: 'осЭНС2тэо' },
    { id: 'осЭНС2утп', value: 'осЭНС2утп' },
    { id: 'осЭНСмгс', value: 'осЭНСмгс' },
    { id: 'осЭНСпарм', value: 'осЭНСпарм' },
    { id: 'осЭНСтэо', value: 'осЭНСтэо' },
    { id: 'осЭНСусс', value: 'осЭНСусс' },
    { id: 'Регионстрой', value: 'Регионстрой' },
    { id: 'СД', value: 'СД' },
    { id: 'УТП', value: 'УТП' },
    { id: 'ЦЕХ', value: 'ЦЕХ' },
    { id: 'ЦЭСиП', value: 'ЦЭСиП' },
    { id: 'ЦЭТЛ', value: 'ЦЭТЛ' }
  ]

  typologys = [1, 2, 3, 4, 5];
  
  typologyFilters = [];
  gildFilters = [];
  producerFilters = [];

  constructor(private events: Events,
    private myEvents: MyEvents) {
    for (let i = 0; i < this.gilds.length; i++) {
      this.gildFilters.push(this.gilds[i].id);
    }
    for (let i = 0; i < this.producers.length; i++) {
      this.producerFilters.push(this.producers[i].id);
    }
    for (let i = 0; i < this.typologys.length; i++) {
      this.typologyFilters.push(i + 1 + "");
    }

    this.events.publish(this.myEvents.getEventKeys().ready);
  }

  filterChenged(): void {
    console.log(this.typologyFilters);
    
    this.events.publish(this.myEvents.getEventKeys().ready);
  }
}