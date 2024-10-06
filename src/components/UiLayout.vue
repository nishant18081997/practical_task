<template>
  <div>
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card title="Add Card">
        <v-card-text>
          <v-form ref="form">
            <!-- Name Field -->
            <v-text-field
              v-model="cardDetails.name"
              :rules="rules.nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="cardDetails.bankName"
              :rules="rules.bankNameRules"
              label="Bank Name"
              required
            ></v-text-field>
            <v-select
              v-model="cardDetails.cardName"
              :rules="rules.cardTyprRules"
              label="Card Type"
              :items="['Credit', 'Debit']"
              required
            ></v-select>
            <v-text-field
              v-model="cardDetails.cardNumber"
              :rules="rules.cardNumberRules"
              label="Card Number"
              required
            ></v-text-field>

            <v-text-field
              v-model="cardDetails.expiryDate"
              :rules="rules.expiryDateRules"
              label="Expiry Date"
              required
            ></v-text-field>

            <v-text-field
              v-model="cardDetails.cvv"
              :rules="rules.cvvRules"
              label="CVV"
              required
              type="password"
            ></v-text-field>

            <v-checkbox
              v-model="cardDetails.isDefault"
              label="is set default"
            ></v-checkbox>
          </v-form>
        </v-card-text>

        <template v-slot:actions>
          <v-btn class="ms-auto" text="Close" @click="dialog = false"></v-btn>
          <v-btn class="ms-auto" text="Save" @click="saveCardDetails"
            >Save</v-btn
          >
        </template>
      </v-card>
    </v-dialog>

    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-forward"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card class="mx-auto">
      <template v-slot:title>
        <span class="d-flex">
          <v-tabs v-model="tab" color="primary">
            <v-tab value="CARDS">Cards</v-tab>
            <v-tab value="GD_CARDS">GD CARDS</v-tab>
          </v-tabs>
          <v-spacer />
          <v-btn color="primary" @click="openAddCardDailog">
            <v-icon>mdi-plus</v-icon> Add Cards
          </v-btn>
        </span>
      </template>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="CARDS">
            <v-row>
              <v-col cols="12" md="6">
                <h2>Card details</h2>
              </v-col>
              <v-col cols="12" md="6">
                <div v-for="card in saveCards" :key="card">
                  <h5 class="text-decoration-underline text-primary">
                    {{ card.cardName }}
                  </h5>
                  <div class="show-card-number text-end ma-2">
                    <v-btn
                      color="primary"
                      @click="showCardNumber(card.cardNumber)"
                    >
                      Show Card Number
                    </v-btn>
                  </div>

                  <div class="container">
                    <div class="card-wrapper">
                      <!-- Credit Card -->
                      <div class="credit-card">
                        <div class="bank-logo">{{ card.bankName }}</div>
                        <h2>{{ card.name }}</h2>
                        <div
                          class="card-number"
                          v-if="!showFullCardNumber.includes(card.cardNumber)"
                        >
                          •••• •••• •••• {{ card.cardNumber.slice(-4) }}
                        </div>
                        <div class="card-number" v-else>
                          {{ card.cardNumber }}
                        </div>
                        <div class="card-details">
                          <span>Valid Till: {{ card.expiryDate }}</span>
                          <span>CVV: •••</span>
                        </div>
                        <div class="mastercard-logo">MC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// Form reference
const form = ref(null);

// Breadcrumb items
const items = reactive([
  {
    title: "Home",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Cards",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
]);

// Tab control
const tab = ref("CARDS");

// Dialog visibility
const dialog = ref(false);

// Card details model
const cardDetails = reactive({
  name: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  bankName: "",
  cardName: "",
});

// Form validation rules
const rules = {
  nameRules: [
    (v) => !!v || "Name is required",
    (v) => (v && v.length <= 35) || "Name must be 35 characters or less",
  ],
  bankNameRules: [(v) => !!v || "Name is required"],
  cardTyprRules: [(v) => !!v || "Card type is required"],
  cardNumberRules: [
    (v) => !!v || "Card Number is required",
    (v) =>
      (v && /^[0-9]{16}$/.test(v)) || "Card Number must be exactly 16 digits",
  ],
  expiryDateRules: [
    (v) => !!v || "Expiry Date is required",
    (v) =>
      /^[0-1][0-9]\/[0-9]{2}$/.test(v) || "Expiry Date must be in MM/YY format",
  ],
  cvvRules: [
    (v) => !!v || "CVV is required",
    (v) => (v && v.length === 3) || "CVV must be 3 digits",
  ],
};

// Method to save card details
const saveCardDetails = async () => {
  if (form.value) {
    const { valid } = await form.value.validate();
    console.log(valid);
    if (valid) {
      await saveCards.value.push(cardDetails);

      dialog.value = false;
    } else {
      alert("Please correct the errors in the form.");
    }
  }
};

const openAddCardDailog = async () => {
  dialog.value = true;
  // form.value.reset();
};

const saveCards = ref([]);
const showFullCardNumber = ref([]);
const showCardNumber = (cNumber) => {
  if (!showFullCardNumber.value.includes(cNumber)) {
    showFullCardNumber.value.push(cNumber);
  } else {
    const indx = showFullCardNumber.value.indexOf(cNumber);
    showFullCardNumber.value.splice(indx, 1);
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f7fa;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-wrapper {
  display: flex;
  gap: 20px;
}

.credit-card {
  background-color: #6fa4b6;
  color: white;
  border-radius: 15px;
  padding: 20px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  height: 200px;
}

.credit-card .bank-logo {
  position: absolute;
  top: 20px;
  right: 20px;
}

.credit-card h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.credit-card .card-number {
  letter-spacing: 3px;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.credit-card .card-details {
  font-size: 0.9em;
  display: flex;
  justify-content: space-between;
}

.credit-card .show-card-number {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
}

.credit-card .mastercard-logo {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #ff5f00;
  border-radius: 50%;
  color: white;
  padding: 5px;
  font-size: 0.9em;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
}

.actions button {
  background-color: #edf3f7;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.actions button:hover {
  background-color: #dbe6ec;
}
</style>
