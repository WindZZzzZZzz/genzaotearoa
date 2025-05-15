# Airtable Fund Data Upload Instruction
- [Upload Process](#upload-process)
  - [Via the GenZ Aotearoa website](#via-the-airtable-form)
  - [Via the Airtable form](#via-the-airtable-form)
- [Data Structure](#data-structure)
- [Additional Information](#additional-information)

## Upload Process

There are two ways to upload a new fund opportunity to the database: via the GenZ Aotearoa website or through the Airtable form. The following sections provide detailed instructions for each method.

### Via the GenZ Aotearoa website

1. Open the [GenZ Aotearoa KOHA for KAUPAPA page](https://www.genzaotearoa.org/koha-for-kaupapa-1). 2. Click the button 'Opportunities coming soon' to jump to the [fund opportunities page](https://www.genzaotearoa.org/fund-info2)
3. Click the button 'Submit opportunity' at the bottom to jump to the [Upload opportunity page](https://www.genzaotearoa.org/submit-fund-info)
4. After the form is loaded, fill the data in the form following the [data instruction](#data-structure)
5. Required fields must have a value. Optional fields may be left blank. If you need to modify the structure of any field, please contact Leo.
6. After fill all the fields in the form, click the sumbit button at the bottom. If you see the succeed information, you can find it in the Airtable database.

### Via the Airtable form
1. Open the [form view](https://airtable.com/appNCvJQZ3VaYleTs/pagTHMbmkh1hI5LCt/edit) in Airtable directly.
2. Fill the form follow the instruction in [the last section](#via-the-genz-aotearoa-website)

## Data Structure

Below is a table of the information you’ll need to provide in the form. Please follow the 'How to fill in the form' and 'Required' to set the data correctly.

| Field Name| Field Type | How to Fill in the Form | Required |
| --------- | -------- | ---- | -------------------- |
| Fund Name | text | The name of the fund | Required |
| Organisation | text | The name of the organisation that provides this fund | Required |
| Bio | long text | The description of this fund | Required |
| Amount | text | The amount of this fund. If not sure, please fill "Unknown" | Required |
| Age Eligibility | Single select | Choose an age group from the dropdown(If you cannot find a age group, please contact Leo to add it) | Required |
| Geographic Eligibility | Single select | Select a category from the dropdown  | Required |
| Region | Multiple Select | Select the regions applicable for the fund. If there are no specific requirements, choose 'All New Zealand | Required |
| Type of Funding | Multiple Select | Select the types applicable for the fund. If no specific requirement, choose 'No Limit' | Required |
| Open Date | Date | Set the open date of the fund. If not sure, leave it empty | Optional |
| Close Date | Date | Set the close date of the fund. If not sure, leave it empty | Optional |
| Apply Link | URL | The link applying the fund | Required |
| Support Link | URL | The link providing the support information(e.g. Home Page, Faq Page) | Required |
| Phone | Phone Number | The phone number of the fund or the organisation | Optional |
| Email | Email | The email of the fund or the organisation | Optional |
| Logo | Images | Upload images(hotos/logos) of the fund(Can be found on their website) | Required |
| Structure of Organisation | Single Select | Whether applicants need to be a registered charity to be eligible for this grant | Required |
| Reporting Requirements | Single Select | Whether it is a flexible fund with minimal reporting, or there are specific reporting and accountability requirements tied to how the grant is used | Required |

## Additional Information

- After submitting a new opportunity, it will not appear on the website immediately. Updates may take up to 24 hours, as the website does not access Airtable directly. Instead, the data is manually synced to a CSV file once per day.
- If you need to modify the data structure, please contact Leo.
