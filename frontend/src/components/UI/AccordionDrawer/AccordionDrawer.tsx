// This component functionality is to display custom component provided via children
// as well as provide boolean values if its open or not to parent component

// ======= COMPONENTS =========
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionDrawerProps {
  panelName: string;
  sx?: object;
  panelTitle?: string;
  children: React.ReactNode;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const AccordionDrawer = ({
  panelName,
  sx,
  panelTitle,
  children,
  expanded,
  onChange,
}: AccordionDrawerProps) => {
  return (
    <Accordion expanded={expanded} onChange={onChange} sx={sx}>
      {/* the onChange event handler provides two arguments:
      the synthetic event and a boolean indicating whether the panel is expanded or not.
      This is how isExpanded gets its value. When you call handleExpandPanel
      in parent component `AccordionDrawer`,
      it returns a function that expects these two arguments. */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelName}-content`}
        id={`${panelName}-header`}
      >
        {`Panel ${panelTitle}`}
      </AccordionSummary>
      {/* children here is another component such like @/app/routes/admin/UserList */}
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionDrawer;
