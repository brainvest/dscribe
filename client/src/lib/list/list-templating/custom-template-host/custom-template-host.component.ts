import {Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {DscribeTemplateComponent} from '../dscribe-template-component';
import {EntityTypeTemplateMapper} from '../entity-type-template-mapper';

@Component({
	selector: 'dscribe-custom-template-host',
	templateUrl: './custom-template-host.component.html',
	styleUrls: ['./custom-template-host.component.css']
})
export class CustomTemplateHostComponent {

	private _entityTypeName: string;
	private _data: any;
	private _templateComp: DscribeTemplateComponent;

	@Output() select = new EventEmitter<void>();

	@Input()
	set isSelected(value: boolean) {
		if (this._templateComp) {
			console.log(value, this._data);
			this._templateComp.select = value;
		}
	}


	@Input()
	set data(value: any) {
		this._data = value;
		if (this._templateComp) {
			this._templateComp.data = value;
		}
	}

	get data() {
		return this._data;
	}

	@Input()
	set entityTypeName(value: string) {
		this._entityTypeName = value;
		this.loadComponent();
	}

	get entityTypeName() {
		return this._entityTypeName;
	}

	@ViewChild('host', {read: ViewContainerRef}) host: ViewContainerRef;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
	}

	loadComponent() {
		const cardData = EntityTypeTemplateMapper.get(this._entityTypeName);
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardData.component);
		this.host.clear();
		const componentRef = this.host.createComponent(componentFactory);
		this._templateComp = <DscribeTemplateComponent>componentRef.instance;
		this._templateComp.selectChange.subscribe(() => {
			this.select.emit();
			console.log('click', this._data);
		});
		this._templateComp.data = this.data;
	}


}
