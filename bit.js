var apt = 0; //Intervalo
var bal = 0; //Valor de entrada da sua carteira
var valArrego = 2; //Valor multiplicador para poder ganhar
var valMultip = 2.75; //Valor multiplicador básico
var pperda = 0.1; //Stop de perda ex.: pperda*100 = 10%
var valorInicial = parseFloat($("#balance").text());
var valorFinal = 0;
var tempoClick = 3500;//3.5 segundos
function aposta() { var numb = Math.floor((Math.random() * 10) + 1); if(numb >= 6){ $('#double_your_btc_bet_hi_button').click(); } else { $('#double_your_btc_bet_lo_button').click(); }  }
function aumenta() { if(parseFloat($("#win_amount").text()) <= 0.00000063){ $("#double_your_btc_2x").click(); }else{ zera(); aumenta(); aumenta(); } }
function perdeu() { return $("#double_your_btc_bet_lose").text().indexOf("lose")>-1; }
function quanto() { return $("#double_your_btc_bet_lose").text().split(" ").includes("0.00000256"); }
function minimiza() { return $("#double_your_btc_bet_lose").text().split(" ").includes("0.0000008"); }
function zera() { $("#double_your_btc_min").click(); $("#double_your_btc_payout_multiplier").val(valMultip); $("#double_your_btc_payout_multiplier").text(valMultip); }
function amentaVai() { aumenta(); aposta(); }
function zeraVai() { zera(); aposta(); }
function arrego() { $("#double_your_btc_payout_multiplier").text(valArrego); $("#double_your_btc_payout_multiplier").val(valArrego); }
function stop() {
    clearInterval(apt);
    apt=0;
    valorFinal = parseFloat($("#balance").text());
    console.info('Valor Inicial:'+valorInicial);
    console.info('Valor Final:'+valorFinal);
    if((valorFinal-valorInicial) < 0){console.info("PERDEU!");} else {console.info("GANHOU!");}
}
function ligaSom() { $('#manual_enable_sounds').prop('checked', true); }
function mute() { $('#manual_enable_sounds').prop('checked', false); }
function run() {
    bal = parseFloat($("#balance").text());
    aposta();
    zera();
    apt = setInterval(function(){
        if(perdeu()) {
            if(quanto()) {
                if(parseFloat($("#balance").text()) == 0.00000000) {
                    stop();
                } else if(parseFloat($("#balance").text()) <= 0.00000050) {
                    stop();
                } else {
                    if(parseFloat($("#balance").text())<=bal*(1-pperda)) {
                        stop();
                    } else {
                        zeraVai();
                    }
                }
            } else {
                if(minimiza()) {
                    arrego();
                }
                amentaVai();
            }
        } else {
            zeraVai();
        }
    }, tempoClick);
}
stop();
run();
