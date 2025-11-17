import React from "react";
 // Grid2 cho size={{}}
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Row hiển thị thông tin
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Grid container spacing={1} sx={{ py: 1 }}>
    <Grid size={{ xs: 5 }}>
      <Typography fontWeight={500} color="grey.700">
        {label}
      </Typography>
    </Grid>
    <Grid size={{ xs: 7 }}>
      <Typography fontWeight={600}>{value}</Typography>
    </Grid>
  </Grid>
);

// Card có tiêu đề + edit icon
const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card sx={{ p: 2, position: "relative", borderRadius: 3, mb: 4 }}>
    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
      {title}
    </Typography>

    <IconButton
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        bgcolor: "green",
        "&:hover": { bgcolor: "darkgreen" },
        color: "white",
      }}
    >
      <EditIcon />
    </IconButton>

    <Divider sx={{ mb: 2 }} />
    {children}
  </Card>
);

const Profile = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      {/* Personal Details */}
      <Card sx={{ p: 3, mb: 4, borderRadius: 4, position: "relative" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Personal Details
        </Typography>

        <IconButton
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            bgcolor: "green",
            "&:hover": { bgcolor: "darkgreen" },
            color: "white",
          }}
        >
          <EditIcon />
        </IconButton>

        
            <Grid className="pb-5" size={{}}>
            <Avatar 
              src="https://qwatchluxury.com/wp-content/uploads/2024/03/dong-ho-nam-rolex-daytona-boc-vang-that-18k-mat-den-coc-so-dinh-da-rep-11-ew-factory-40mm-2.jpg"
              sx={{ width: 110, height: 110 }}
            />
          </Grid>
          <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3} alignItems="center">
          

          <Grid size={{ xs: 9, sm: 7 }}>
            <InfoRow label="Seller Name" value="Dung" />
            <InfoRow label="Seller Email" value="RaamVirani@gmail.com" />
            <InfoRow label="Seller Mobile" value="9876567843" />
          </Grid>
        </Grid>
      </Card>

      {/* Business Details */}
      <SectionCard title="Business Details">
        <InfoRow label="Business Name/Brand Name" value="Virani Clothing" />
        <InfoRow label="GSTIN" value="GSTIN3447633" />
        <InfoRow label="Account Status" value="PENDING" />
      </SectionCard>

      {/* Pickup Address */}
      <SectionCard title="Pickup Address">
        <InfoRow label="Address" value="Mumbai new shivam building" />
        <InfoRow label="City" value="Mumbai" />
        <InfoRow label="State" value="Maharahstra" />
        <InfoRow label="Mobile" value="8976542931" />
      </SectionCard>

      
      <SectionCard title="Bank Details">
        <InfoRow label="Account Holder Name" value="Dung" />
        <InfoRow label="Account Number" value="8976542931" />
        <InfoRow label="IFSC CODE" value="YES834" />
        
      </SectionCard>
    </Box>
  );
};

export default Profile;
