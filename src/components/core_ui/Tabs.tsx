import { useState } from 'react';
import styled from 'styled-components';

export type TabData = {
  title: string;
  content: JSX.Element;
};

type TabsProps = {
  tabs: TabData[];
  defaultComponent: JSX.Element;
  onAddTabClicked: () => void;
};

const TabsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TabBar = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  border: 1px solid red;
`;

const TabSummary = styled.div`
  padding: 4px;
`;

const AddTabIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 4px;
  padding: 0;
  margin: 4px 0 0 0;
`;

export default function Tabs({
  tabs,
  defaultComponent,
  onAddTabClicked,
}: TabsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <TabsContainer>
      <TabBar>
        {tabs.map((tab, i) => (
          <TabSummary onClick={() => setCurrentTab(i)}>{tab.title}</TabSummary>
        ))}
        <AddTabIconButton onClick={onAddTabClicked}>+</AddTabIconButton>
      </TabBar>
      {tabs.length > 0 ? tabs[currentTab].content : defaultComponent}
    </TabsContainer>
  );
}
