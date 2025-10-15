package types

import (
	"fmt"

	host "github.com/cosmos/ibc-go/v10/modules/core/24-host"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params:   DefaultParams(),
		DenomMap: []Denom{},
		PortId:   PortID}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	if err := host.PortIdentifierValidator(gs.PortId); err != nil {
		return err
	}

	denomIndexMap := make(map[string]struct{})

	for _, elem := range gs.DenomMap {
		index := fmt.Sprint(elem.Denom)
		if _, ok := denomIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for denom")
		}
		denomIndexMap[index] = struct{}{}
	}

	return gs.Params.Validate()
}
