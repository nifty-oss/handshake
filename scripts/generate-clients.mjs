#!/usr/bin/env zx
import "zx/globals";
import * as k from "@metaplex-foundation/kinobi";
import { getAllProgramIdls } from "./utils.mjs";

// Instanciate Kinobi.
const kinobi = k.createFromIdls(getAllProgramIdls());

// Update programs.
kinobi.update(
  k.updateProgramsVisitor({
    handshakeProgram: { name: "handshake" },
  })
);

// Update accounts.
kinobi.update(
  k.updateAccountsVisitor({
    handshake: {
      seeds: [
        k.constantPdaSeedNodeFromString("handshake"),
        k.variablePdaSeedNode(
          "asset",
          k.publicKeyTypeNode(),
          "The asset account"
        ),
      ],
    },
  })
);

// Set default account values accross multiple instructions.
kinobi.update(
  k.setInstructionAccountDefaultValuesVisitor([
    // default accounts
    {
      account: "handshake",
      ignoreIfOptional: true,
      defaultValue: k.pdaValueNode("handshake"),
    },
    {
      account: "niftyAssetProgram",
      ignoreIfOptional: true,
      defaultValue: k.publicKeyValueNode(
        "AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73",
        "niftyAsset"
      ),
    },
  ])
);

// Update instructions.
kinobi.update(
  k.updateInstructionsVisitor({
    initiate: {
      accounts: {
        systemProgram: {
          defaultValue: k.conditionalValueNode({
            condition: k.accountValueNode("payer"),
            ifTrue: k.publicKeyValueNode(
              "11111111111111111111111111111111",
              "systemProgram"
            ),
          }),
        },
      },
    },
  })
);

// Set account discriminators.
const key = (name) => ({
  field: "discriminator",
  value: k.enumValueNode("Discriminator", name),
});
kinobi.update(
  k.setAccountDiscriminatorFromFieldVisitor({
    counter: key("handshake"),
  })
);

// Render JavaScript.
const jsClientV2 = path.join(__dirname, "..", "clients", "js-v2");
kinobi.accept(
  k.renderJavaScriptExperimentalVisitor(
    path.join(jsClientV2, "src", "generated"),
    { prettier: require(path.join(jsClientV2, ".prettierrc.json")) }
  )
);

// Render JavaScript (legacy).
const jsClientV1 = path.join(__dirname, "..", "clients", "js-v1");
kinobi.accept(
  k.renderJavaScriptVisitor(
    path.join(jsClientV1, "src", "generated"),
    { prettier: require(path.join(jsClientV1, ".prettierrc.json")) }
  )
);

// Render Rust.
const rustClient = path.join(__dirname, "..", "clients", "rust");
kinobi.accept(
  k.renderRustVisitor(path.join(rustClient, "src", "generated"), {
    formatCode: true,
    crateFolder: rustClient,
  })
);
