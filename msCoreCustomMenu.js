(function($){
	//
	$.fn.msCoreCustomMenu = function( method )
	{
		var methods =
		{
			init :										function( options ){ 			return this.each(function(){	_init(this, options);});}
		};
		
		//----------------------------------------------------------------------
		//----------------------------------------------------------------------
		var defaults =
		{
			json							: null,
			menu_width						: 200,
			activate						: function() {}
		};
		
		var plugin_settings;
		var plugin_element;
		var menu_width;

		//----------------------------------------------------------------------
		//----------------------------------------------------------------------

		// Method calling logic
		if ( methods[method] )//caso exista um método, esse método é chamado
		{
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method )//caso não exista um método ou seja apenas passado o objeto
		{
			return methods.init.apply( this, arguments );
		}
		else//caso o método não exista
		{
		  $.error( 'Method ' +  method + ' does not exist on msCoreCustomMenu' );
		}
		
		function _init($this, options)
		{
			plugin_element 						= $($this);
			plugin_settings 					= $.extend(defaults, options);	
			menu_width							= plugin_settings.menu_width;		
			//------------------------------------------------------------------------
			//o menu somente será criado com uma estrutura json
			if(plugin_settings.json)
			{
				_createMenu();
			}
			else
			{
				alert('Dados para criação do menu não encontrados!');
			}
		}	

		//cria o menu
		function _createMenu ()
		{
			plugin_element.prepend(_getHtmlWrapper());

			//array com os itens do menu principal
			var _itens='';
			
			$.each(plugin_settings.json.menu.itens, function( index, value ) {
				
				value.item.uId = index;
				value.item.submenu = (value.submenu) ? true : false;
				_itens += _getHtmlItem (value.item);
				
				if(value.submenu)
				{
					_createSubmenu({dados:value.submenu,id:value.item.uId});
				}

			});
			
			$(".msCoreCustomMenu-slider").prepend(_getHtmlTemplateMenu({dados:_itens,menu:true}));
			
			_insertCSS();
			_addMouseEvents();
			_openMenu();

		}

		//abre o menu caso exista um hash id_menu no link acessado
		function _openMenu ()
		{
			var QueryString = function ()
			{
			  // This function is anonymous, is executed immediately and 
			  // the return value is assigned to QueryString!
			  var query_string = {};
			  var query = window.location.search.substring(1);
			  var vars = query.split("&");
			  
			  for (var i=0;i<vars.length;i++)
			  {
				var pair = vars[i].split("=");
				
				// If first entry with this name
				if (typeof query_string[pair[0]] === "undefined")
				{
				  query_string[pair[0]] = decodeURIComponent(pair[1]);
					// If second entry with this name
				}
				else if(typeof query_string[pair[0]] === "string")
				{
				  var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
				  query_string[pair[0]] = arr;
					// If third or later entry with this name
				}
				else
				{
				  query_string[pair[0]].push(decodeURIComponent(pair[1]));
				}
			  } 
				return query_string;
			}();
			
			//caso exista o id_menu abrimos o menu na posição do id
			if(QueryString.id_menu)
			{
				var _hash = QueryString.id_menu;
				var _arr = _hash.split('_');//número de submenus a serem abertos
				var _idWrapper='';
				
				for(var i=0;i<_arr.length;i++)
				{
					_idWrapper += ((i==0) ? '':"_")+_arr[i];
					
					$(".msCoreCustomMenu-menu").each(function(){
						if(_idWrapper==$(this).data('menu'))
						{
							$(this).show();
							return false;
						}
					});
				}
				//move o menu para a posição do menu ativo
				var _pos = menu_width*_arr.length;
				$('.msCoreCustomMenu-slider').css({left:-_pos});
				
			}		
		}

		function _addMouseEvents ()
		{
		    $(".msCoreCustomMenu-menu-back").click(function(){

		        var _pos = $(".msCoreCustomMenu-slider").position().left + menu_width;
		        var _obj = $(this).closest(".msCoreCustomMenu-submenu");

		        $(".msCoreCustomMenu-slider").stop().animate({left: _pos}, 300, function ()
		        {
		            _obj.hide();
		        });

		        return false;
		    });

		    $(".msCoreCustomMenu-menu-anchor").click(function(){
		        if($(this).attr('href')=='')
		        {	
		        	if($(this).data('func'))
		        	{
		        		callCustomFunc ($(this));
		        		return false;
		        	}
		        	else
		        	{
		        		var _d = $(this).data('menu');
				        $(".msCoreCustomMenu-submenu").each(function(){

				            var _d_check = $(this).data('menu');

				            if(_d_check == _d)
				            {
				                $(this).show();
				                var _pos = $(".msCoreCustomMenu-slider").position().left - menu_width;

				                $(".msCoreCustomMenu-slider").stop(true,true).animate({left: _pos}, 300);
				                return false;
				            }
				        });
				        return false;
		        	}		        
		        }
		        else
		        {
		        	if($(this).data('func'))
		        	{
		        		callCustomFunc ($(this));
		        		return false;
		        	}
		        	else//open link normally
		        	{
		        		var _href = $(this).attr('href');
		        		var _id = $(this).closest('.msCoreCustomMenu-menu').data('menu');
		        		if(_id)
		        		{
		        			$(this).attr('href',_href+"?&id_menu="+_id);
		        		}
		        	}
		        }
		    });
		}

		function callCustomFunc (__arg__)
		{
			var functionName = __arg__.data('func');
			var tmpFunc = new Function(functionName);
			tmpFunc();
		}

		function _createSubmenu (__arg__)
		{
			var _itens='';
			
			$.each(__arg__.dados, function( index, value ) {
				value.item.uId = __arg__.id+"_"+index;
				value.item.submenu = (value.submenu) ? true : false;
				_itens += _getHtmlItem (value.item);
				
				if(value.submenu)
				{
					_createSubmenu({dados:value.submenu,id:value.item.uId});
				}

			});
			$(".msCoreCustomMenu-slider").prepend(_getHtmlTemplateMenu({dados:_itens,id:__arg__.id}));
		}

		//retorna os htmls para a estrutura do menu
		function _getHtmlItem (__arg__)
		{
			var _html = '<li id="'+__arg__.id+'" class="'+__arg__.class+'">';
                _html += '<div class="msCoreCustomMenu-menu-item"><a data-func="'+__arg__.customFunction+'" target="'+__arg__.target+'"  href="'+__arg__.link+'" class="msCoreCustomMenu-menu-anchor" data-menu="'+__arg__.uId+'">'+__arg__.title+'</a>'+((__arg__.submenu) ? '<i class="spt-arrow-right">'+_getRightArrow()+'</i>' : '')+'</div>';
                _html += '</li>';
            return _html;
		}

		function _getHtmlTemplateMenu (__arg__)
		{
			var _html = '<div class="msCoreCustomMenu-menu '+((!__arg__.menu) ? "msCoreCustomMenu-submenu" : '')+'" data-menu="'+((__arg__.id) ? __arg__.id : '')+'">';
				if(!__arg__.menu)//o template é de um submenu e devemos apresentar o botão de voltar
				{
	            	_html += '<div class="msCoreCustomMenu-submenu-back">';
	                _html += '<div class="msCoreCustomMenu-menu-item"><i class="spt-arrow-left">'+_getLeftArrow()+'</i><a href="#"class="msCoreCustomMenu-menu-back">VOLTAR</a></div>';
	            	_html += '</div>';
				}
            	_html += '<ul>';
            	_html += __arg__.dados;
            	_html += '</ul></div>';
            return _html;
		}

		function _getHtmlWrapper ()
		{
			var _html = '<div class="msCoreCustomMenu-wrapper"><div class="msCoreCustomMenu-slider">';
				_html+= '<div class="clear"></div></div></div>';
    		return _html;
		}

		function _insertCSS ()
		{
			var _style = '<style type="text/css">';
				_style += '.msCoreCustomMenu-submenu{ display:none;}'; 
				_style += '.msCoreCustomMenu-wrapper{ position: relative; overflow-x: hidden; }'; 
				_style += '.msCoreCustomMenu-slider{ position: relative; width: 2000px;left: 0;}'; 
				_style += '.msCoreCustomMenu-menu{ float: left; width: 200px;}'; 
				_style += '.msCoreCustomMenu-menu ul{ margin:0 0 0 20px;}'; 
				_style += '.msCoreCustomMenu-menu ul li{ margin-bottom:10px; border-bottom:1px solid #eeeeee; padding-bottom:10px;}'; 
				_style += '.msCoreCustomMenu-menu-anchor,.msCoreCustomMenu-menu-anchor:visited{color: #0072c6; font-size:14px; display:block; padding-right:15px;}'; 
				_style += '.msCoreCustomMenu-submenu-back{ padding: 0 0 10px 20px;}';
				_style += '.msCoreCustomMenu-submenu-back .msCoreCustomMenu-menu-item{border-bottom:1px solid #eeeeee; padding-bottom:10px;}';
				_style += '.msCoreCustomMenu-menu-back,.msCoreCustomMenu-menu-back:visited{ color:#9E9E9E; font-size:10px;}';
				_style += '.msCoreCustomMenu-menu-item{ position:relative;}';
				_style += '.spt-arrow-right{ position:absolute; top:50%; right:0; margin-top:-8px;}';
				_style += '.spt-arrow-left{ padding-right:5px; display:inline-block;}';
				
				_style +='</style>';
			$('head').append(_style);
		}

		

		function _getRightArrow ()
		{
			//http://www.flaticon.com/free-icon/arrow-point-to-right_32213#term=right-arrow&page=1&position=2
			return '<img width="10" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnUlEQVQ4T7WTTQ4CIQyFXzmhN9BpLzCeRN0DGU/gEWswMek4/JSFXRFKv9IHj2AixngKIbxU9S4iV5trrckmUkorEd3KnqpuIrKMIDtAOZxz3gCcvZADYBZSBcxAmgAvpAvwQIaACmQRkSL0J/4PsM8K4MnMF/s33CLWirsjjDp3NfAWV28wU3wAWDO1Zv41107Er50BPJh5HTmx5N82H2sRIVwWsgAAAABJRU5ErkJggg=="/>';
		}	

		function _getLeftArrow ()
		{
			//http://www.flaticon.com/free-icon/arrowhead-thin-outline-to-the-left_32542#term=left-arrow&page=1&position=10
			return '<img width="9" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4T6WTUQ4CIQxEp0f0BK6Uf+NNvAB19waekBqMm6DAtkS+mQeZ1xKcR0TuAK4551OM8bnHyJMXkRXAudxV1RszF9j7mIA6DGALISz1o4cAK3z4A094CPCGu4CZcANIKS1E9PiU1BTWM/ZVYg1Q1ZWZL5bmxsKPcxPS1TgDGc6BF+IepFEnU6Pcg5iAYuGvZdo1jtb5BfcxbhF9xJNzAAAAAElFTkSuQmCC"/>';
		}	
    
	};//-------------------------------
})(jQuery);
