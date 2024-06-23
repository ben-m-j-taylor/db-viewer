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
  border-bottom: 1px solid ${(props) => useColourHex(props, 'border')};
  transition: border-color 0.25s;

  &.hasTabs {
    border-color: ${(props) => useColourHex(props, 'focusBorder')};
  }
`;

const TabSummary = styled.div`
  padding: 0 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: border-color 0.25s;

  &:first-child.selected {
    border-top-left-radius: 0;
  }

  &.selected {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-width: 1px 1px 0 1px;
    border-style: solid;
    border-color: ${(props) => useColourHex(props, 'focusBorder')};
  }
`;

const AddTabIconButton = styled.button`
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  padding: 4px;
  border-radius: 0.25rem;
  color: ${(props) => useColourHex(props, 'foreground')};
  background-color: ${(props) => useColourHex(props, 'background')};

  &:hover {
    border-top-right-radius: 0.25rem;
    border-width: 1px 1px 0 0;
    border-style: solid;
    border-color: ${(props) => useColourHex(props, 'focusBorder')};
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
      <TabBar className={tabs.length > 0 ? 'hasTabs' : ''}>
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
