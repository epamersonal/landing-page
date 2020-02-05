$(function() {

	const pairsBox = $('.line--running');
	let pairsList = $('.pairs__list');
	let pairsItem = $('.pairs__item');
	
	let pairsListClone = $('pairs__list--clone') || null;

	let windowWidth = $(window).width();
	let pairsItemsAmount = pairsItem.length;
	let pairsItemsWidth = 0;
	let marqeeAnimationTime = '80';

	

	function initPairs() {
		pairsList = $('.pairs__list');
                pairsItem = $('.pairs__item');
		getPairsWidth();
		setPairsListWidth();
                        //clonePairsList();
		setCSS();
	}

	function getPairsWidth() {
		pairsItem.each((index, item) => {
			pairsItemsWidth += $(item).outerWidth(true);
		});
	}

	function setPairsListWidth() {
		pairsList.width(pairsItemsWidth);
	}

	function clonePairsList() {
		pairsListClone = pairsList.clone();
		pairsListClone.addClass('pairs__list--clone');
		pairsListClone.appendTo(pairsBox);
	}

	function setCSS() {
		let fullWidth = windowWidth + pairsItemsWidth;

		pairsList.css({
			transform: 'translateX(' +windowWidth+ 'px)',
			animation: 'marquee ' +marqeeAnimationTime+ 's linear infinite'
		});
		document.getElementsByClassName('pairs__list')[0].style.opacity = 1;


		/*pairsListClone.css({
			transform: 'translateX(' +fullWidth+ 'px)',
			animation: 'marqueeClonee ' +marqeeAnimationTime+ 's linear infinite',
			opacity: 1
		});*/

		var style = document.createElement('style');
		style.innerHTML =
		`
		@keyframes marquee {
			0 {
				transform: translateX(${windowWidth}px);
			}
			100% {
				transform: translateX(-${6*pairsItemsWidth}px);
			}
		}
		
		`;

		pairsBox.append(style);
	}

	//console.log('windowWidth', windowWidth);
	//console.log('pairsItemsAmount', pairsItemsAmount);
	
        setTimeout(function () {
            updatePair();
            if(pairsList) {
                    initPairs();
            }
        }, 1000);
	//console.log('pairsItemsWidth 2', pairsItemsWidth);
	/* TODO news slider */
});
var PairListData=[];
function updatePair(){
    if($("div").hasClass("pairs__list")){
        $.get(get_module_path('dashboard/TickerList/test.json'), function (res) {
            var pairs__list="";
            var key="";
            var pk_napr="";
        Object.keys(res).forEach(function(k){
            key=k.replace(".","_");
            if(key in PairListData){
                if(res[k]!=PairListData[key]){
                    PairListData[key]=res[k];
                    $('#pairs_'+key).removeClass("pairs__item__value--negative");
                    $('#pairs_'+key).removeClass("pairs__item__value--positive");
                    pk_napr="";
                    if(res[k]<0){
                        pk_napr="pairs__item__value--negative";
                    }                
                    if(res[k]>0){
                        pk_napr="pairs__item__value--positive";
                    }
                    if(pk_napr!=""){
                        $('#pairs_'+key).addClass(pk_napr);
                    }
                    $('#pairs_'+key).text(" "+res[k]+"%");
                }
            }else{
                PairListData[key]=res[k];
                pk_napr="";
                if(res[k]<0){
                    pk_napr="pairs__item__value--negative";
                }                
                if(res[k]>0){
                    pk_napr="pairs__item__value--positive";
                }
                pairs__list+='<div class="pairs__item"><span class="pairs__item__currencies">'+k.replace("."," / ")+'</span><span id="pairs_'+key+'" class="pairs__item__value '+pk_napr+'"> '+res[k]+'%</span></div>';
            }
            });
            if(pairs__list!=""){
                $(".pairs__list").html(pairs__list);
            }
            setTimeout(function () {
                updatePair();
            }, 1000);
        }, 'json');
    }
}