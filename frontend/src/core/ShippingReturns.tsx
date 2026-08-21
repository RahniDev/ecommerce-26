import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Layout from "./Layout";

const ShippingReturns = () => {
    return ( 
         <Layout title="">
        <Box
            sx={{
                maxWidth: "900px",
                mx: "auto",
                px: { xs: 2, sm: 4 },
                py: { xs: 5, md: 8 },
            }}
        > 
            <Box sx={{ textAlign: "center", mb: 7 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 500,
                        mb: 2,
                    }}
                >
                    Shipping & Returns
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: "650px",
                        mx: "auto",
                        lineHeight: 1.8,
                    }}
                >
                    Everything you need to know about receiving, returning,
                    and exchanging your order.
                </Typography>
            </Box>

            {/* Shipping */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        mb: 2,
                        fontWeight: 500,
                    }}
                >
                    Shipping
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.8 }}
                >
                    We carefully prepare and package every order to make sure
                    it reaches you safely. Please find our shipping information
                    below.
                </Typography>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Where do you ship?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            I currently ship to every country in the EU.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>How much does shipping cost?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            Shipping costs are calculated at checkout based on
                            your delivery address and the size and weight of
                            your order.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            How long will my order take to arrive?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            Orders are usually prepared and dispatched within
                            1-2 business days. Once dispatched, delivery
                            typically takes [] business days depending on
                            your location.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>How will my order be packaged?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            Every item is carefully packaged to help protect it
                            during transit. We use appropriate protective
                            materials depending on the type and size of the
                            product.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Will I receive tracking information?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            If tracking is available for your shipping method,
                            you will receive tracking information by email once
                            your order has been dispatched.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

            {/* Returns */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        mb: 2,
                        fontWeight: 500,
                    }}
                >
                    Returns & Refunds
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.8 }}
                >
                    If you are not completely satisfied with your purchase,
                    please see the information below about returns and
                    refunds.
                </Typography>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>What is your return policy?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            You can request a return within [X] days of
                            receiving your order, provided the item meets our
                            return conditions.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>How do I return an item?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            Please contact me at [email address] with your
                            order number and the reason for your return. I
                            will provide you with the next steps.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Who pays for return shipping?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            [Add your return shipping policy here.]
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            When will I receive my refund?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            Once your returned item has been received and
                            inspected, we will process your refund. The time
                            it takes for the refund to appear in your account
                            may depend on your payment provider.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

            {/* Damaged / incorrect orders */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        mb: 2,
                        fontWeight: 500,
                    }}
                >
                    Damaged or Incorrect Orders
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.8,
                        maxWidth: "750px",
                    }}
                >
                    If your order arrives damaged or you receive an incorrect
                    item, please contact us as soon as possible with your
                    order number and photographs of the item and packaging.
                    We will work with you to resolve the issue.
                </Typography>
            </Box>
        </Box>
        </Layout>
    );
};

export default ShippingReturns;