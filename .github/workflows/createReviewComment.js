module.exports = createReviewComment
const fs = require('fs')

function createReviewComent(addonId, addonVersion) {
	const discussions = JSON.parse(
		fs.readFileSync('./discussions.json')
	)
	if (discussions.addonId === undefined) {
		
	}
	var addonFileName
	for (fileData of changedFiles) {
		const filename = fileData.filename
		var errMsg
		if (filename.startsWith("addons")) {
			if (Boolean(addonFileName)){
				errMsg = "Please submit addon releases individually. One file at a time."
				fs.writeFileSync('./validationErrors.md', errMsg)
				throw errMsg
			}
			if (fileData.status != "added") {
				errMsg = "Modifications to submitted add-ons will not be auto-approved"
				fs.writeFileSync('./validationErrors.md', errMsg)
				throw errMsg
			}
			addonFileName = filename
		}
		else {
			errMsg = "Non-addon-submission files updated. This will not be auto-approved."
			fs.writeFileSync('./validationErrors.md', errMsg)
			throw errMsg
		}
	}
	return addonFileName
}

