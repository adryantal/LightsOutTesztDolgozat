const { test } = QUnit;

QUnit.module("ellenőrzés() metódus tesztelese", (hooks) =>{
  hooks.before(() => { 
    this.lojatek = new LOJatek(0);
  });

  test( "Létezik-e az ellenőrzés metódus", (assert)=> {
    assert.ok(this.lojatek.ellenorzes, "létezik az ellenőrzés metódus" );
  });

  test( "Létezik-e az ellenőrzés metódus és fv.-e", (assert)=> {
    assert.ok(typeof this.lojatek.ellenorzes=="function", "létezik az ellenőrzés metódus és fv." );
  });

  test( "Minden lámpa felkapcsolva", (assert)=> {
    const meret = 3;
    this.lojatek = new LOJatek(meret*meret);
    assert.equal(this.lojatek.ellenorzes(), meret*meret );
  });
  
  test( "Minden lámpa lekapcsolva", (assert)=> {    
    this.lojatek = new LOJatek(0);
    assert.equal(this.lojatek.ellenorzes(), 0 );
  });

  test( "Kiinduláskor néhány elem felkapcsolva (5) ", (assert)=> {    
    this.lojatek = new LOJatek(5);
    assert.equal(this.lojatek.ellenorzes(), 5 );
  });

});
 
  QUnit.module("szomszedokValtoztatasa() metódus tesztelese", (hooks) =>{
    hooks.beforeEach(() => { 
      this.lojatek = new LOJatek(0);
    });
    
    test( "Létezik-e a szomszedokValtoztatasa metódus", (assert)=> {
      assert.ok(this.lojatek.szomszedokValtoztatasa, "létezik a szomszedokValtoztatasa metódus" );
    });
    
    test( "Létezik-e a szomszedokValtoztatasa metódus és fv.-e", (assert)=> {
      assert.ok(typeof this.lojatek.szomszedokValtoztatasa=="function", "létezik a szomszedokValtoztatasa metódus és fv." );
    });
    
    test( "Középső lámpát kapcsoljuk", (assert)=> {      
      const meret = 3;      
      let kozepsoID = Math.round(meret*meret/2)-1;
      this.lojatek.szomszedokValtoztatasa(kozepsoID);    
      assert.equal(lampak[kozepsoID-meret].allapot, true);
      assert.equal(lampak[kozepsoID+meret].allapot, true);
      assert.equal(lampak[kozepsoID+1].allapot, true);
      assert.equal(lampak[kozepsoID-1].allapot, true);
      lampak[kozepsoID].allapot=true; //felkapcsoljuk a középső elemet is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 5 );
    });

    test( "Bal felső sarokban lévő lámpát kapcsoljuk", (assert)=> {          
      let balFelsoID = 0;
      this.lojatek.szomszedokValtoztatasa(balFelsoID);   
      assert.equal(lampak[balFelsoID+meret].allapot, true);
      assert.equal(lampak[balFelsoID+1].allapot, true);      
      lampak[balFelsoID].allapot=true; //felkapcsoljuk a bal felső sarokban lévő elemet is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 3 );
    });

    test( "Jobb felső sarokban lévő lámpát kapcsoljuk", (assert)=> {                
      let jobbFelsoID = meret-1; //2
      this.lojatek.szomszedokValtoztatasa(jobbFelsoID);   
      assert.equal(lampak[jobbFelsoID+meret].allapot, true);
      assert.equal(lampak[jobbFelsoID-1].allapot, true);      
      lampak[jobbFelsoID].allapot=true; //felkapcsoljuk a jobb felső sarokban lévő elemet is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 3 );
    });

    test( "Bal alsó sarokban lévő lámpát kapcsoljuk", (assert)=> { 
      let balAlsoID = meret*meret-1-(meret-1); //6
      this.lojatek.szomszedokValtoztatasa(balAlsoID);   
      assert.equal(lampak[balAlsoID-meret].allapot, true);
      assert.equal(lampak[balAlsoID+1].allapot, true);      
      lampak[balAlsoID].allapot=true; //felkapcsoljuk a a bal alsó sarokban lévő  elemet is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 3 );
    });

    test( "Jobb alsó sarokban lévő lámpát kapcsoljuk", (assert)=> { 
      let jobbAlsoID = meret*meret-1; //8
      this.lojatek.szomszedokValtoztatasa(jobbAlsoID);   
      assert.equal(lampak[jobbAlsoID-meret].allapot, true);
      assert.equal(lampak[jobbAlsoID-1].allapot, true);      
      lampak[jobbAlsoID].allapot=true; //felkapcsoljuk a jobb alsó sarokban lévő elemet is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 3 );
    });
  

    test( "Bal szélső oszlop középső lámpáját kapcsoljuk", (assert)=> { 
      let balOszlopKozepsoID = meret; //3
      this.lojatek.szomszedokValtoztatasa(balOszlopKozepsoID);   
      assert.equal(lampak[balOszlopKozepsoID-meret].allapot, true);
      assert.equal(lampak[balOszlopKozepsoID+meret].allapot, true);
      assert.equal(lampak[balOszlopKozepsoID+1].allapot, true);      
      lampak[balOszlopKozepsoID].allapot=true; //felkapcsoljuk a bal szélső oszlop középső lámpáját is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 4 );
    });

    test( "Jobb szélső oszlop középső lámpáját kapcsoljuk", (assert)=> { 
      let jobbOszlopKozepsoID = meret+meret-1; //5
      this.lojatek.szomszedokValtoztatasa(jobbOszlopKozepsoID);   
      assert.equal(lampak[jobbOszlopKozepsoID-meret].allapot, true);
      assert.equal(lampak[jobbOszlopKozepsoID+meret].allapot, true);
      assert.equal(lampak[jobbOszlopKozepsoID-1].allapot, true);      
      lampak[jobbOszlopKozepsoID].allapot=true; //felkapcsoljuk a jobb szélső oszlop középső lámpáját is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 4 );
    });

    test( "Legfelső sor középső lámpáját kapcsoljuk", (assert)=> { 
      let FelsoKozepsoID = Math.round(meret/2)-1; //1
      this.lojatek.szomszedokValtoztatasa(FelsoKozepsoID);   
      assert.equal(lampak[FelsoKozepsoID+1].allapot, true);
      assert.equal(lampak[FelsoKozepsoID+meret].allapot, true);
      assert.equal(lampak[FelsoKozepsoID-1].allapot, true);      
      lampak[FelsoKozepsoID].allapot=true; //felkapcsoljuk a legfelső sor középső lámpáját is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 4 );
    });


    test( "Legalsó sor középső lámpáját kapcsoljuk", (assert)=> { 
      let AlsoKozepsoID = meret*meret-Math.round(meret/2); //7
      this.lojatek.szomszedokValtoztatasa(AlsoKozepsoID);   
      assert.equal(lampak[AlsoKozepsoID+1].allapot, true);
      assert.equal(lampak[AlsoKozepsoID-meret].allapot, true);
      assert.equal(lampak[AlsoKozepsoID-1].allapot, true);      
      lampak[AlsoKozepsoID].allapot=true; //felkapcsoljuk a legfelső sor középső lámpáját is (a kattintáseseményt szimulálva)
      assert.equal(this.lojatek.ellenorzes(), 4 );
    });


  });




