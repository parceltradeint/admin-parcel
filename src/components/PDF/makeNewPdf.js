import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formartDate } from "@/common/formartDate";
import { parcelLogo } from "./image";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 50,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    // backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
});

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.body} >
      <View style={styles.headerTop}>
                <Text>Customer Invoice</Text>
                <Image style={styles.image} src={"https://react-pdf.org/images/logo.png"} />

        <Text>{formartDate(new Date())}</Text>
            </View>
            <View>

            </View>
    </Page>
  </Document>
);
