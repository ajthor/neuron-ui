'use babel';

import NeuronUiView from './neuron-ui-view';
import { CompositeDisposable } from 'atom';

export default {

  neuronUiView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.neuronUiView = new NeuronUiView(state.neuronUiViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.neuronUiView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'neuron-ui:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.neuronUiView.destroy();
  },

  serialize() {
    return {
      neuronUiViewState: this.neuronUiView.serialize()
    };
  },

  toggle() {
    console.log('NeuronUi was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
