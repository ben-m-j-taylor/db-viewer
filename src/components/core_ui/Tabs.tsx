import { useState } from 'react';
import styled from 'styled-components';
import { useColourHex } from '../app/theming/utils';

export type TabData = {
  id: string;
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
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  background-color: ${(props) => useColourHex(props, 'background2')};
  border-bottom: 1px solid ${(props) => useColourHex(props, 'border')};
  transition: border-color 0.25s;
`;

const TabSummary = styled.div`
  height: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.25s;

  &.selected {
    background-color: ${(props) => useColourHex(props, 'background')};
  }
`;

const AddTabIconButton = styled.button`
  height: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  color: ${(props) => useColourHex(props, 'foreground')};
  background-color: ${(props) => useColourHex(props, 'background2')};
  transition: background-color 0.25s;

  &:hover {
    background-color: ${(props) => useColourHex(props, 'background')};
  }
`;

const TabContent = styled.div`
  width: 100%;
  height: calc(100% - 24px);
  display: none;

  &.visible {
    display: initial;
  }
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
          <TabSummary
            key={`summary-${tab.id}`}
            className={currentTab === i ? 'selected' : ''}
            onClick={() => setCurrentTab(i)}
          >
            {tab.title}
          </TabSummary>
        ))}
        <AddTabIconButton onClick={onAddTabClicked}>+</AddTabIconButton>
      </TabBar>

      {tabs.length === 0 ? defaultComponent : null}

      {tabs.map((tab, i) => (
        <TabContent
          key={`content-${tab.id}`}
          className={currentTab === i ? 'visible' : ''}
        >
          {tab.content}
        </TabContent>
      ))}
    </TabsContainer>
  );
}
