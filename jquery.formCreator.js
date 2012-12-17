(function( $ ) {
	
	$.fn.formCreator = function(options){
		this.each(function(){
			var fieldsets = options.fieldsets;
			var buttons = options.buttons;
			
			var form = $('<form/>');
			
			//fieldset
			var fieldset, fieldDiv, inputFieldDiv, fields;
			for(model_fieldset in fieldsets){
				fieldset = $('<fieldset/>');
				if(typeof fieldsets[model_fieldset].legend != 'undefined' && fieldsets[model_fieldset].legend != ''){
					fieldset.append('<legend>'+fieldsets[model_fieldset].legend+'</legend>');
				}
				if(typeof fieldsets[model_fieldset].message != 'undefined' && fieldsets[model_fieldset].message != ''){
					fieldset.append('<p class="message">'+fieldsets[model_fieldset].message+'</p>');
				}
				for(field in fieldsets[model_fieldset].fields){
					fields = fieldsets[model_fieldset].fields;
					fieldDiv = $('<div class="field '+field+'"/>');
					if(fields[field].disabled){
						fieldDiv.addClass('disabled');
					}
					if(typeof fields[field].divCss != 'undefined'){
						fieldDiv.addClass(fields[field].divCss);
					}
					if(typeof fields[field].label != 'undefined'){
						fieldDiv.append('<label>'+fields[field].label+(fields[field].required ? ' *' : '')+'</label>');
					}
					if(fields[field].type == 'text'){
						inputFieldDiv = $('<input type="text" name="'+field+'"/>');
					}
					else if(fields[field].type == "autocomplete"){
						inputFieldDiv = $('<input type="text" autocomplete="off" name="'+field+'_show"/>');
						inputFieldDiv.customAutocomplete(fields[field].plugin_options);
						inputHiddenField = $('<input class="input" type="hidden" name="'+field+'">');
						if (isEdition(options.object, field)) {
							inputHiddenField.val(options.object[field].id);
						}
						fieldDiv.append(inputHiddenField);
					}
					else if(fields[field].type == "datetime"){
						inputFieldDiv = $('<input class="input" type="text" autocomplete="off" name="'+field+'"/>');
						inputFieldDiv.datetimepicker(fields[field].plugin_options);
					}
					else if(fields[field].type == "date"){
						inputFieldDiv = $('<input class="input" type="text" autocomplete="off" name="'+field+'"/>');
						inputFieldDiv.datepicker(fields[field].plugin_options);
					}
					else if(fields[field].type == "time"){
						inputFieldDiv = $('<input class="input" type="text" autocomplete="off" name="'+field+'"/>');
						inputFieldDiv.timepicker(fields[field].plugin_options);
					}
					else{
						inputFieldDiv = window['input_'+fields[field].type](options, fields);
					}
					if(typeof fields[field].placeholder != 'undefined'){
						inputFieldDiv.attr('placeholder', fields[field].placeholder);
						inputFieldDiv.attr('title', fields[field].placeholder);
					}
					if (isEdition(options.object, field)) {
						inputFieldDiv.val(fields[field].showField ? options.object[field][fields[field].showField] : options.object[field]);
					}
					if(fields[field].disabled){
						inputFieldDiv.attr('disabled', 'disabled');
					}
					fieldDiv.append(inputFieldDiv);
					fieldset.append(fieldDiv);
				}
				form.append(fieldset);
			}
			
			//buttons
			var buttonsDiv = $('<div class="buttons"/>')
			var buttonLink;
			for(button in buttons){
				buttonLink = '<a href="#" class="button '+buttons[button].color+' '+(buttons[button].disabled ? 'disabled' : buttons[button].css)+'">'+buttons[button].text+'</a>';
				buttonsDiv.append(buttonLink);
			}
			form.append(buttonsDiv);
			
			$(this).append(form);
			return form;
		});
	}
		
})(jQuery);