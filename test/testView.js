const { test } = QUnit;

QUnit.module("Felület tesztelése", (hooks) =>{
  hooks.beforeEach(() => { 
    this.lojatek = new LOJatek(0); //példányosítja a JatekterView-t is
  });

  test( "Létrejön-e a megfelelő számú elem? ", (assert)=> {
    assert.equal($("article div").length,9);
  });

  
  test( "Megfelelő lesz-e az elem ID-ja? ", (assert)=> {
    for (let index = 0; index < $("article div").length; index++) {
      const aktDiv = $("article div").eq(index);
      assert.equal(aktDiv.attr("dataID"),index);
    }    
  });


  test( "Megfelelő-lesz-e az elem háttérszíne?", (assert)=> {
    for (let index = 0; index < $("article div").length; index++) {
      const aktDiv = $("article div").eq(index);     
      let szin = aktDiv.css("background-color");      
      assert.equal(szin,"rgb(255, 165, 0)"); //alapból narancsszínű lesz
    }    
  });

  test( "Kattintásra megváltozik-e az adott elem színe? ", (assert)=> {
    for (let index = 0; index < $("article div").length; index++) {
      const aktDiv = $("article div").eq(index);
      let elozoSzin = aktDiv.css("background-color"); //kattintás előtti szín
      aktDiv.click();
      let ujSzin = aktDiv.css("background-color"); //kattintás utáni szín      
      assert.equal(elozoSzin==ujSzin,false); //a két szín nem egyezik meg
    } 
   });

  });
   QUnit.module("A felületen helyesen jelenik-e meg a lekapcsolt lámpák száma?", (hooks) =>{
    hooks.beforeEach(() => { 
      this.lojatek = new LOJatek(0);
    });


  test( "Az InfoSzövegbe kiírt szám megegyezik-e az ellenorzes() metódus által visszaadott értékkel?", (assert)=> {
    let lampakOff = 0; //lekapcsolt lámpák száma
    for (let index = 0; index < $("article div").length; index++) {
      const aktDiv = $("article div").eq(index);
      if(aktDiv.css("background-color")=="green"){ //ha zöld, akkor le van kapcsolva
        lampakOff++;
      }
    }
    assert.equal(lampakOff,this.lojatek.ellenorzes()); //az összegzés tételével, manuálisan, a div színét vizsgálva
    assert.equal($(".infoSzoveg").html(),this.lojatek.ellenorzes()); //az infoSzöveg tartalmának összevetése az ellenőrzés metódus eredményével
    //console.log(lampakOff); --> sajnos a használt gépen nem működött a console log :(
  });

});

  


