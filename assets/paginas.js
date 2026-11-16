// Menu mobile
(function(){
  var menu=document.getElementById('menu'), hamb=document.getElementById('hamb');
  if(hamb&&menu){hamb.onclick=function(){menu.classList.toggle('aberto')};}
  var ano=document.getElementById('ano'); if(ano) ano.textContent=new Date().getFullYear();
})();

// Animações com Motion (motion.dev)
window.addEventListener('load',function(){
  if(!window.Motion || matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.classList.remove('js');return;
  }
  var M=window.Motion, animate=M.animate, inView=M.inView, scroll=M.scroll, stagger=M.stagger;

  animate('.capa .migalhas, .capa .tag, .capa h1, .capa p, .capa .btn',{opacity:[0,1],y:[30,0]},{duration:.7,delay:stagger(.1),ease:[.22,1,.36,1]});
  animate('.capa .bolha',{scale:[0,1]},{type:'spring',bounce:.5,duration:1,delay:stagger(.15,{startDelay:.4})});
  document.querySelectorAll('.capa .bolha').forEach(function(b,i){
    animate(b,{y:[0,-16,0]},{duration:4+i,repeat:Infinity,ease:'easeInOut',delay:1.4});
  });
  var capa=document.querySelector('.capa');
  if(capa) scroll(animate('.capa .wrap',{y:[0,80],opacity:[1,.3]}),{target:capa,offset:['start start','end start']});

  inView('.rv',function(info){
    var el=info.target||info;
    var irmaos=[].slice.call(el.parentElement.children).filter(function(c){return c.classList.contains('rv')});
    var i=Math.max(0,irmaos.indexOf(el));
    animate(el,{opacity:[0,1],y:[36,0]},{duration:.7,delay:i*.08,ease:[.22,1,.36,1]});
  },{margin:'0px 0px -8% 0px'});

  inView('[data-conta]',function(info){
    var el=info.target||info, fim=+el.dataset.conta, suf=el.dataset.suf||'', pre=el.dataset.pre||'';
    animate(0,fim,{duration:1.5,ease:'easeOut',onUpdate:function(v){el.textContent=pre+Math.round(v).toLocaleString('pt-BR')+suf}});
  });

  // Abrir/fechar do FAQ com animação
  document.querySelectorAll('.faq details').forEach(function(d){
    d.addEventListener('toggle',function(){
      if(d.open){var r=d.querySelector('.resp'); animate(r,{opacity:[0,1],y:[-8,0]},{duration:.35});}
    });
  });

  document.querySelectorAll('.card,.num').forEach(function(c){
    c.addEventListener('pointerenter',function(){animate(c,{y:-8},{type:'spring',stiffness:300,damping:18})});
    c.addEventListener('pointerleave',function(){animate(c,{y:0},{type:'spring',stiffness:300,damping:18})});
  });
  animate('.whats',{scale:[1,1.1,1]},{duration:1.8,repeat:Infinity,ease:'easeInOut'});
});
