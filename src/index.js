import React from "react";
import { render } from "react-dom";
import { withFormik, Form, Field } from "formik";
import Yup from "yup";
//omkar Kirpan
const App = ({ values, errors, touched, isSubmitting }) => (
	<Form>
		<div className="form-group">
			{touched.ctitle &&
				errors.ctitle && <p style={{ color: "red" }}>{errors.ctitle}</p>}
			<label for="ctitle">Please enter your competition title: &nbsp;</label>
			<Field
				type="text"
				name="ctitle"
				className="form-control"
				id="ctitle"
				placeholder="Enter competition title"
			/>
		</div>
		<div className="form-group">
			<label for="discipline">Please select upto three disciplines:</label>
			<Field
				component="select"
				name="discipline"
				className="form-control"
				id="discipline"
			>
				<option value="Game Design">Game Design</option>
				<option value="Architecture">Architecture</option>
				<option value="Interaction Design">Interaction Design</option>
				<option value="Web UI/UX">Web UI/UX</option>
				<option value="Furniture Design">Furniture Design</option>
			</Field>
		</div>
		<p>Please select one or more categories:</p>
		<div className="form-group form-check">
			<Field
				type="checkbox"
				className="form-check-input"
				id="cat1"
				name="cat1"
				checked={values.cat1}
			/>
			<label className="form-check-label" for="cat1">
				Awards/Grants/Scholarship
			</label>
		</div>
		<div className="form-group form-check">
			<Field
				type="checkbox"
				className="form-check-input"
				id="cat2"
				name="cat2"
				checked={values.cat2}
			/>
			<label className="form-check-label" for="cat2">
				Built/Product realisation
			</label>
		</div>
		<div className="form-group">
			{touched.loc &&
				errors.loc && <p style={{ color: "red" }}>{errors.loc}</p>}
			<label for="loc">
				Please enter the location of the comeptition: (Optional) &nbsp;
			</label>
			<Field
				type="text"
				name="loc"
				className="form-control"
				id="loc"
				placeholder="Enter location of the comeptition:"
			/>
		</div>
		<div className="form-group">
			{touched.cwebsite &&
				errors.cwebsite && <p style={{ color: "red" }}>{errors.cwebsite}</p>}
			<label for="cwebsite">
				Please enter the website of the comeptition: (Optional) &nbsp;
			</label>
			<Field
				type="text"
				name="cwebsite"
				className="form-control"
				id="cwebsite"
				placeholder="Website of the comeptition"
			/>
		</div>
		<button className="btn btn-primary" disabled={isSubmitting}>
			Submit
		</button>
	</Form>
);

const FormikApp = withFormik({
	mapPropsToValues({ ctitle, cwebsite, loc, discipline, cat1, cat2 }) {
		return {
			ctitle: "",
			cwebsite: cwebsite || "https://uni.xyz",
			cat1: cat1 || false,
			cat2: cat2 || false,
			discipline: discipline || "Architecture",
			loc: loc || "Mumbai, India"
		};
	},
	validationSchema: Yup.object().shape({
		ctitle: Yup.string().required("Competition's name is required"),
		cwebsite: Yup.string().url("Competition website must be a valid url")
	}),
	handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
		setTimeout(() => {
			if (values.email === "andrew@test.io") {
				setErrors({ email: "That email is already taken" });
			} else {
				resetForm();
			}
			console.log(values);
			setSubmitting(false);
		}, 2000);
	}
})(App);

render(<FormikApp />, document.getElementById("root"));
