import {Tabs, DragTabList, DragTab, PanelList, Panel} from 'react-tabtab';
import {simpleSwitch} from 'react-tabtab/lib/helpers/move';

//Tabs
class Drag extends React.Component {
  constructor(props){
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleTabSequenceChange = this.handleTabSequenceChange.bind(this);

    const tabs = [{title: 'dragtab1', content: "test 1"},
                  {title: 'dragtab2', content: "test 2"},
                   {title: 'dragtab3', content: "test 3"}];
    this.state = {
      activeIndex: 0,
      tabs
    };
  }

  handleTabChange(index){
    console.log(index);
    this.setState({activeIndex:index});
  }

  handleTabSequenceChange({oldIndex, newIndex}){
    const tabs = this.state.tabs;
    const updateTabs = simpleSwitch(tabs, oldIndex, newIndex);
    this.setState({
      tabs: updateTabs,
      activeIndex: newIndex,
    })
  }

  render() {
    const tabsTemplate = [];
    const panelTemplate = [];
    this.state.tabs.forEach((tab, index) => {
      tabsTemplate.push(<DragTab key={index}>{tab.title}</DragTab>)
      panelTemplate.push(<Panel key={index}>{tab.content}</Panel>)
    })

    return (
      <Tabs activeIndex={this.state.activeIndex}
            onTabChange={this.handleTabChange}
            onTabSequenceChange={this.handleTabSequenceChange}>
        <DragTabList>
          {tabsTemplate}

        </DragTabList>
        <PanelList>
          {panelTemplate}
        </PanelList>
      </Tabs>      
    );
  }
}
