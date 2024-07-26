import React, { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

type AccordionSection = {
  uuid: number;
  heading: string;
  content: string;
};

type AccordionProps = {
  sections: AccordionSection[];
};

export default function AccordionFlush(props: AccordionProps) {
  return (
    <Accordion allowZeroExpanded>
      {props.sections.map((item) => (
        <AccordionItem key={item.uuid}>
          <AccordionItemHeading>
            <AccordionItemButton>{item.heading}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{item.content}</AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
