import {HasTypeInfo} from '../../../metadata/property-metadata';
import {IFilterNodeFactory} from '../i-filter-node-factory';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterTreeVisitor} from '../filter-tree-visitor';
import {ParameterInfo} from '../parameter-info';
import {FilterNodeType} from '../filter-node-type';

export abstract class FilterNode {
	static factory: IFilterNodeFactory;
	title: string;
	protected _inputType: HasTypeInfo;
	protected _outputType: HasTypeInfo;

	protected constructor(public parent: FilterNode) {
		if (parent != null) {
			this.inputType = parent.childInputType;
		}
	}

	getStorageNode(): StorageFilterNode {
		return FilterTreeVisitor.map(this, node => {
			if (!node || node.isEmpty()) {
				return null;
			}
			const storageNode = new StorageFilterNode();
			node.setStorageNodeProperties(storageNode);
			storageNode.nodeType = node.nodeType;
			return storageNode;
		}, (child, parent) => {
			if (!parent.children) {
				parent.children = [];
			}
			parent.children.push(child);
		});
	}

	setStorageNode(storage: StorageFilterNode) {
		if (storage == null) {
			return;
		}
		this.applyStorageNode(storage);
		const children = this.children;
		if (!children || !storage.children) {
			return;
		}
		if (storage.children.length > children.length) {
			for (let i = children.length; i < storage.children.length; i++) {
				this.addChild(false);
			}
		}
		for (let i = 0; i < children.length; i++) {
			if (i > storage.children.length) {
				break;
			}
			if (storage.children[i]) {
				if (children[i].nodeType !== storage.children[i].nodeType) {
					const newChild = FilterNode.factory.create(storage.children[i].nodeType, this);
					this.replaceChild(children[i], newChild);
					children[i] = newChild;
				}
				children[i].setStorageNode(storage.children[i]);
			}
		}
	}

	getTreeParameters(): ParameterInfo[] {
		return FilterTreeVisitor.getRoot(this).getSubtreeParameters();
	}

	private getSubtreeParameters(): ParameterInfo[] {
		const parameters: ParameterInfo[] = [];
		FilterTreeVisitor.visit(this, (node) => {
			if (node.nodeType === FilterNodeType.Lambda) {
				parameters.push((node as any).parameter);
			}
		});
		return parameters;
	}

	abstract setStorageNodeProperties(storage: StorageFilterNode);

	abstract applyStorageNode(storage: StorageFilterNode);

	get inputType(): HasTypeInfo {
		return this._inputType;
	}

	set inputType(value: HasTypeInfo) {
		this._inputType = value;
	}

	get childInputType(): HasTypeInfo {
		return this._inputType;
	}

	get outputType(): HasTypeInfo {
		return this._outputType;
	}

	set outputType(value: HasTypeInfo) {
		this._outputType = value;
	}

	childOutputTypeChanged(child: FilterNode) {
		if (this.parent) {
			this.parent.childOutputTypeChanged(this);
		}
	}

	abstract get nodeType(): FilterNodeType;

	abstract get children(): FilterNode[];

	abstract isEmpty(): boolean;

	abstract isValid(): boolean;

	canReplaceChild() {
		return false;
	}

	shouldBeInlined(): boolean {
		if (this.nodeType !== FilterNodeType.Logical) {
			return true;
		}
		return true;
	}

	addChild(constant: boolean) {
	}

	removeChild(child: FilterNode) {
	}

	replaceChild(oldChild: FilterNode, newChild: FilterNode) {
	}
}
