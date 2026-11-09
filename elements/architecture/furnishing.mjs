export function createFurnishings({asset,table,el,path,txt}){
function furniture(p,r){const x=r.x,y=r.y;
 if(r.kind==='class'){
  asset(p,'storage.bookcase-top',x+20,y+20,110);asset(p,'storage.bookcase-top',x+240,y+20,110);
  for(let row=0;row<2;row++)for(let col=0;col<3;col++){const xx=x+35+col*105,yy=y+78+row*79;table(p,'table.study',xx,yy,65);asset(p,'seat.dining',xx+22,yy+49,22);}
 }
 if(r.kind==='office'){
  asset(p,'object.rug-round',x+110,y+95,165,'#985a4d','#b49352');asset(p,'storage.bookcase-top',x+210,y+22,135);asset(p,'fixture.fireplace-top',x+30,y+20,80,'#a89876');
  table(p,'table.desk',x+147,y+125,100);asset(p,'seat.armchair',x+176,y+72,45,'#8c5650','#b8956c');asset(p,'seat.armchair',x+38,y+125,47,'#8b8463','#bcb18a');asset(p,'decor.planter-floor',x+305,y+95,42,'#8f9b67','#a7b37a');
 }
 if(r.kind==='store'){
  asset(p,'storage.bookcase-top',x+24,y+18,135);asset(p,'storage.bookcase-top',x+215,y+18,135);
  for(let i=0;i<4;i++)asset(p,i%2?'object.chest':'object.crate',x+34+i*75,y+93,49);
  asset(p,'object.crate',x+35,y+165,42);asset(p,'object.chest',x+145,y+170,62);
 }
 if(r.kind==='library'){
  asset(p,'object.rug',x+106,y+100,175,'#a0624b','#b39257');
  asset(p,'storage.bookcase-top',x+20,y+18,160);asset(p,'storage.bookcase-top',x+200,y+18,160);
  asset(p,'storage.bookcase-top',x+20,y+90,105);asset(p,'storage.bookcase-top',x+252,y+90,105);
  table(p,'table.round',x+150,y+135,84);asset(p,'seat.armchair',x+102,y+147,36,'#8f9271');asset(p,'seat.armchair',x+244,y+148,36,'#8f9271');asset(p,'decor.planter-floor',x+320,y+163,36,'#87955e','#acb47e');
 }
 if(r.kind==='practice'){
  asset(p,'storage.bookcase-top',x+25,y+28,115);asset(p,'storage.bookcase-top',x+245,y+28,115);
  for(let i=0;i<3;i++){table(p,'table.prep',x+26+i*110,y+120,82,true);asset(p,'seat.stool',x+54+i*110,y+177,20);}
  table(p,'table.desk',x+28,y+204,85);asset(p,'decor.planter-floor',x+328,y+213,30,'#829264');
 }
 if(r.kind==='group'){
  asset(p,'object.rug',x+44,y+88,120,'#8c7951','#b9a477');asset(p,'object.rug',x+223,y+88,120,'#8c7951','#b9a477');
  for(const dx of [55,235]){table(p,'table.round',x+dx,y+113,80);asset(p,'seat.dining',x+dx+25,y+80,25);asset(p,'seat.dining',x+dx+25,y+202,25);}
  asset(p,'storage.bookcase-top',x+80,y+235,120);
 }
 if(r.kind==='lounge'){
  asset(p,'object.rug',x+80,y+92,210,'#a08a59','#c0a76e');asset(p,'seat.sofa',x+110,y+100,165,'#976355','#b58c73');table(p,'table.coffee',x+145,y+195,90);asset(p,'seat.armchair',x+47,y+171,45,'#79866c','#a9b48c');asset(p,'seat.armchair',x+295,y+171,45,'#79866c','#a9b48c');asset(p,'storage.bookcase-top',x+266,y+22,91);
 }
 if(r.kind==='infirmary'){
  asset(p,'bed.single',x+60,y+85,90,'#9b825c','#e8dcc0');asset(p,'bed.single',x+235,y+85,90,'#9b825c','#e8dcc0');
  asset(p,'storage.bookcase-top',x+25,y+220,95);asset(p,'storage.bookcase-top',x+260,y+220,95);asset(p,'table.coffee',x+162,y+176,55);asset(p,'accessory.bottle',x+180,y+180,10,'#778c6b');
 }
}

return furniture;
}
