import {IFilterNodeFactory} from '../i-filter-node-factory';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterTreeVisitor} from '../filter-tree-visitor';
import {ParameterInfo} from '../parameter-info';
import {FilterNodeType} from '../filter-node-type';
import {HasTypeInfo} from '../../../abstractions/metadata-abstractions';

// @dynamic
export abstract class FilterNode {
	static factory: IFilterNodeFactory;
	title?: string;
	protected _inputType?: HasTypeInfo;
	protected _outputType?: HasTypeInfo;

	protected constructor(public parent: FilterNode) {
		if (parent != null) {
			this.inputType = parent.childInputType;
		}
	}

	getStorageNode(): StorageFilterNode | undefined {
		return FilterTreeVisitor.map(this, node => {
			if (!node || node.isEmpty()) {
				return undefined;
			}
			const storageNode = new StorageFilterNode();
			node.setStorageNodeProperties(storageNode);
			storageNode.nodeType = node.nodeType;
			return storageNode;
		}, (child, parent) => {
			if (!!child && !!parent) {
				if (!parent.children) {
					parent.children = [];
				}
				parent.children.push(child);
			}
		});
	}

	setStorageNode(storage: StorageFilterNode) {
		if (!storage) {
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
			if (i >= storage.children.length) {
				break;
			} // TODO: do we need this? How can this happen? JS is not multithreaded
			const storageNodeType = storage.children[i]?.nodeType;
			if (storageNodeType) {
				if (children[i].nodeType !== storageNodeType) {
					const newChild = FilterNode.factory.create(storageNodeType, this);
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

	abstract setStorageNodeProperties(storage: StorageFilterNode): void;

	abstract applyStorageNode(storage: StorageFilterNode): void;

	get inputType(): HasTypeInfo | undefined {
		return this._inputType;
	}

	set inputType(value: HasTypeInfo | undefined) {
		this._inputType = value;
	}

	get childInputType(): HasTypeInfo | undefined {
		return this._inputType;
	}

	get outputType(): HasTypeInfo | undefined {
		return this._outputType;
	}

	set outputType(value: HasTypeInfo | undefined) {
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
